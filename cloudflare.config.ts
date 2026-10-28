import { bindings, defineConfig, defineWorker } from 'cf/config';

export default defineConfig({
  worker: defineWorker({
    name: 'lyrics-book',
    entrypoint: './worker.ts',
    compatibilityDate: '2026-10-27',
    compatibilityFlags: ['nodejs_compat'],
    assets: {
      htmlHandling: 'none',
      notFoundHandling: 'none',
      runWorkerFirst: ['/*', '!/_next/static/*', '!/*/_next/static/*'],
    },
    env: {
      ASSETS: bindings.assets(),
    },
    workersDev: false,
    previewUrls: false,
    observability: {
      enabled: true,
      traces: { enabled: true, headSamplingRate: 0.01 },
    },
  }),
});
