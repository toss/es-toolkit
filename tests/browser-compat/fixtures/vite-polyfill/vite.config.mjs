import { defineConfig } from 'vite';

// The Vite setup documented in docs/browser-support.md for supporting
// Chrome 80 / Safari 14.1: downlevel syntax via build.target and load the
// minimal polyfill set at the entrypoint.
export default defineConfig({
  root: import.meta.dirname,
  base: './',
  build: {
    target: ['chrome80', 'safari14.1'],
    outDir: '../../dist-fixtures/vite-polyfill',
    emptyOutDir: true,
    minify: false,
  },
});
