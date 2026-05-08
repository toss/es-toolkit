import { createRequire } from 'node:module';
import { defineConfig } from 'tsdown';

const packageJson = createRequire(import.meta.url)('./package.json') as {
  exports: Record<string, string>;
};

const entrypoints = Object.values(packageJson.exports).filter(f => /^(\.\/)?src\//.test(f) && f.endsWith('.ts'));

export default defineConfig([
  {
    entry: entrypoints,
    format: ['esm', 'cjs'],
    outDir: 'dist',
    platform: 'neutral',
    unbundle: true,
    fixedExtension: false,
    dts: true,
    sourcemap: false,
    treeshake: false,
    clean: true,
    exports: false,
    attw: false,
    publint: false,
  },
  {
    entry: { 'browser.global': './src/browser.ts' },
    format: 'umd',
    outDir: 'dist',
    platform: 'browser',
    globalName: '_',
    minify: true,
    sourcemap: false,
    dts: false,
    clean: false,
    exports: false,
    attw: false,
    publint: false,
    outputOptions: {
      entryFileNames: '[name].js',
    },
  },
]);
