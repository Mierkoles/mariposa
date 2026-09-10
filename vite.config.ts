import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// Served from GitHub Pages at https://<owner>.github.io/mariposa/. Change `base`
// (and the manifest scope/start_url below) if you host at a domain root.
const base = '/mariposa/';

export default defineConfig({
  base,
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'icon-180.png'],
      manifest: {
        name: 'Mariposa',
        short_name: 'Mariposa',
        description: 'A story that turns into Spanish, one chapter a day.',
        theme_color: '#f4ecdc',
        background_color: '#f4ecdc',
        display: 'standalone',
        scope: base,
        start_url: base,
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        // Content is bundled into the JS, so precaching the build is a full offline copy.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
});
