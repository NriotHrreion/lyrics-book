import vinext from 'vinext/server/fetch-handler';
import { createDocsRequestGuard } from './lib/docs-request-guard';

// Vite supplies filenames at build time. These lazy loaders are never called;
// the lyrics API already uses the same raw MDX modules for downloads.
const docs = import.meta.glob('/content/docs/**/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
});
const guard = createDocsRequestGuard(
  Object.keys(docs).map((file) => file.slice('/content/docs/'.length)),
);

export * from 'vinext/server/fetch-handler';

export default {
  ...vinext,
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return guard(request) ?? vinext.fetch(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
