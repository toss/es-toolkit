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
  // Use this option when this error is fixed:
  // https://github.com/rolldown/rolldown/issues/5264
  // {
  //   entry: [`./src/compat/index.ts`],
  //   outDir: 'dist-compat',
  //   format: ['cjs', 'esm'],
  //   dts: true,
  //   clean: true,
  //   unbundle: true,
  //   outputOptions: {
  //     exports: 'named',
  //   },
  //   target: 'node6',
  // },
]);
