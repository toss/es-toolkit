import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { rollup } from 'rollup';
import aliasPlugin from '@rollup/plugin-alias';
import resolvePlugin from '@rollup/plugin-node-resolve';
import tsPlugin from '@rollup/plugin-typescript';
import { entrypoints, libBuildOptions } from '../rollup.config.mjs';

const OUTPUT_DIR = '.bench-bundle';
const dirPath = resolve(import.meta.dirname, OUTPUT_DIR);

if (existsSync(dirPath)) {
  rmSync(dirPath, { recursive: true, force: true });
}

await time('Build es-toolkit', async () => {
  const libOption = libBuildOptions({
    format: 'esm',
    extension: 'mjs',
    entrypoints,
    outDir: OUTPUT_DIR,
    sourcemap: false,
  });
  const toolkitBundle = await rollup({ ...libOption, logLevel: 'silent' });
  await toolkitBundle.write(libOption.output);
  await toolkitBundle.close();
});

const output = await time('Build benchmark', async () => {
  // Build the benchmark file
  const benchBundle = await rollup({
    input: 'benchmarks/performance/bench.ts',
    plugins: [
      aliasPlugin({
        entries: [{ find: /^es-toolkit/, replacement: `../../${OUTPUT_DIR}` }], // Replace the es-toolkit import with the pre-built.
      }),
      tsPlugin({
        include: ['**/*.ts'],
        exclude: ['**/*.spec.ts'],
        compilerOptions: {
          sourceMap: false,
          inlineSources: false,
          removeComments: true,
          declaration: false,
        },
      }),
      resolvePlugin(),
    ],
    logLevel: 'silent',
  });
  const { output } = await benchBundle.write({
    format: 'esm',
    dir: OUTPUT_DIR,
    entryFileNames: '[name].mjs',
    generatedCode: 'es2015',
  });
  await benchBundle.close();
  return output;
});

// Run the benchmark
await time('Benchmark', () => {
  const bulitBenchFile = resolve(OUTPUT_DIR, output[0].fileName);
  execSync(`node ${bulitBenchFile}`, { stdio: 'inherit' });
});

async function time(title, fn) {
  console.log(`Running ${title}...`);

  const start = performance.now();
  const result = await fn();
  const end = performance.now();

  console.log(`${title}: ${((end - start) / 1000).toFixed(2)}s`);

  return result;
}
