import tailwindcss from '@tailwindcss/vite';
import { fumadocsMdx } from 'fumadocs-mdx/vite';
import vinext from 'vinext';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), fumadocsMdx(), vinext()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
