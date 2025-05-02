import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "Lyrics Book",
  },
  links: [
    {
      text: '歌词本',
      url: '/docs',
      active: 'nested-url',
    },
    {
      text: '贡献指南',
      url: '/docs/contributing',
      active: 'nested-url',
    },
  ],
  githubUrl: 'https://github.com/NriotHrreion/lyrics-book'
};
