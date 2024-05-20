import { defineConfig } from 'vite';
import { default as viteReact } from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact(), svgr(), viteSingleFile(), ViteMinifyPlugin()],
  server: {
    strictPort: true,
  },
  build: {
    outDir: `build`,
  },
  resolve: {
    alias: {
      $fonts: resolve('./public/fonts'),
    },
  },
});
