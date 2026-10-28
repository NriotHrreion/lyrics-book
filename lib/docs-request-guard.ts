import { getSlugs } from 'fumadocs-core/source';

/** Build once per isolate from filenames, without loading MDX or the page tree. */
export function createDocsRequestGuard(files: readonly string[]) {
  const paths = new Set(files.map((file) => {
    const slugs = getSlugs(file);
    return decodeURIComponent(`/docs${slugs.length ? `/${slugs.join('/')}` : ''}`);
  }));

  return (request: Request): Response | undefined => {
    let pathname: string;
    try {
      pathname = decodeURIComponent(new URL(request.url).pathname);
    } catch {
      return new Response(request.method === 'HEAD' ? null : 'Bad Request', {
        status: 400,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
      });
    }

    // Vinext uses both RSC headers and .rsc URLs for client navigation.
    if (pathname.endsWith('.rsc')) pathname = pathname.slice(0, -4);
    pathname = pathname.replace(/\/+$/, '');
    if (pathname !== '/docs' && !pathname.startsWith('/docs/')) return;
    if (paths.has(pathname)) return;

    // Avoid rendering the React layout/404 page for arbitrary crawler URLs.
    return new Response(request.method === 'HEAD' ? null : 'Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  };
}
