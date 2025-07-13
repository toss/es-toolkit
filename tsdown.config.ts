import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: [`./src/index.ts`],
    outDir: 'dist',
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    unbundle: true,
  },
  {
    entry: [`./src/compat/index.ts`],
    outDir: 'dist-compat',
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    unbundle: true,
    inputOptions: {
      transform: {
        target: 'node6',
        helpers: {
          mode: 'Runtime',
        },
      },
    },
    outputOptions: {
      exports: 'named',
    },
    target: 'node6',
  },
]);
