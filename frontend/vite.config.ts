import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    minify: 'esbuild',
    sourcemap: false,
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'src/main.js',
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
});