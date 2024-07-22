import { defineConfig } from 'tsup';

export default [
  defineConfig({
    format: ['cjs', 'esm'],
    entry: ['src/*.ts', 'src/*/*.ts', '!**/*.{spec,test,test-d}.*'],
    sourcemap: true,
    dts: true,
    clean: true,
  }),
  defineConfig({
    format: ['iife'],
    outDir: 'umd',
    entry: ['src/browser.ts'],
    sourcemap: true,
    dts: false,
    clean: true,
    minify: true,
  }),
];
