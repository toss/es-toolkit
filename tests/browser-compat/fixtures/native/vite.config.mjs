import { defineConfig } from 'vite';

// The library code must reach the browser exactly as published: no syntax
// downleveling, no polyfill injection.
export default defineConfig({
  root: import.meta.dirname,
  base: './',
  build: {
    target: 'esnext',
    outDir: '../../dist-fixtures/native',
    emptyOutDir: true,
    minify: false,
  },
});
