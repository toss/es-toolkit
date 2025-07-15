import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dtsPlugin from 'rollup-plugin-dts';
import babel from '@rollup/plugin-babel';

// Use rollup until this error is fixed:
// https://github.com/rolldown/rolldown/issues/5264
export default () => {
  clearDir('dist-compat');

  const input = 'src/compat/index.ts';
  const outDir = 'dist-compat';
  const preserveModulesRoot = 'src/compat';

  /** @type {import('rollup').RollupOptions} */
  return [
    {
      input: input,
      output: [
        {
          dir: outDir,
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot,
        },
        {
          dir: outDir,
          format: 'esm',
          entryFileNames: `[name].mjs`,
          chunkFileNames: `_chunk/[name]-[hash:6].mjs`,
          preserveModules: true,
          preserveModulesRoot,
        },
      ],
      plugins: [
        babel({
          presets: [['@babel/preset-env', { targets: { node: 6 } }], '@babel/preset-typescript'],
          babelHelpers: 'bundled',
          extensions: ['.ts', '.js'],
        }),
      ],
    },
    {
      input: input,
      output: [
        {
          dir: outDir,
          format: 'cjs',
          entryFileNames: `[name].d.ts`,
          chunkFileNames: `_chunk/[name]-[hash:6].d.ts`,
          preserveModules: true,
          preserveModulesRoot,
        },
        {
          dir: outDir,
          format: 'esm',
          entryFileNames: `[name].d.mts`,
          chunkFileNames: `_chunk/[name]-[hash:6].d.mts`,
          preserveModules: true,
          preserveModulesRoot,
        },
      ],
      plugins: [dtsPlugin()],
    },
  ];
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function clearDir(dir) {
  const dirPath = path.join(__dirname, dir);
  if (dir && fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`cleared: ${dir}`);
  }
}
