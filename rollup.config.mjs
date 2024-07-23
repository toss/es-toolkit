// @ts-check

import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { globSync } from 'glob';
import terserPlugin from '@rollup/plugin-terser';
import tsPlugin from '@rollup/plugin-typescript';
import dtsPlugin from 'rollup-plugin-dts';

const testPatterns = ['**/*.bench.ts', '**/*.spec.ts', '**/*.test.ts'];

export default () => {
  clearDir('dist');
  clearDir('umd');

  const files = findLibFiles();

  return [
    libBuildOptions({
      format: 'esm',
      extension: 'mjs',
      inputFiles: files.allFiles,
      outDir: 'dist',
    }),
    libBuildOptions({
      format: 'cjs',
      extension: 'js',
      // For CJS, only treat the package.json#exports paths as entrypoints,
      // resulting in one bundle per category (array, object, etc.),
      // plus one index requiring those bundles.
      inputFiles: files.entrypoints,
      outDir: 'dist',
    }),
    declarationOptions({
      inputFiles: files.entrypoints,
      outDir: 'dist',
    }),
    umdBuildConfig({
      inputFile: './src/browser.ts',
      outFile: 'umd/browser.global.js',
    }),
  ];
};

function findLibFiles() {
  /** @type {{ exports: Record<string, string>}} */
  const packageJson = createRequire(import.meta.url)('./package.json');
  const entrypoints = Object.values(packageJson.exports).filter(f => /^(\.\/)?src\//.test(f) && f.endsWith('.ts'));

  const allFiles = globSync('./src/**/*.ts', {
    cwd: import.meta.dirname,
    ignore: [...testPatterns, '**/src/browser.ts'],
  });

  return {
    entrypoints,
    allFiles,
  };
}

/**
 * @type {(options: {
 *   format: 'esm' | 'cjs';
 *   extension: 'js' | 'cjs' | 'mjs';
 *   inputFiles: string[];
 *   outDir: string;
 * }) => import('rollup').RollupOptions}
 */
function libBuildOptions({ extension, format, inputFiles, outDir }) {
  const isESM = format === 'esm';

  return {
    input: mapInputs(inputFiles),
    plugins: [
      tsPlugin({
        exclude: [...testPatterns],
        compilerOptions: {
          sourceMap: true,
          inlineSources: true,
          declaration: false,
          removeComments: true,
        },
      }),
    ],
    output: {
      format,
      dir: outDir,
      ...fileNames(extension),
      // Using preserveModules disables bundling and the creation of chunks,
      // leading to a result that is a mirror of the input modules.
      // Warning: with this option, all modules that might get imported
      // need to be present in the input, otherwise imports will be broken!
      preserveModules: isESM,
      sourcemap: true,
      generatedCode: 'es2015',
      // Hoisting transitive imports adds bare imports in modules,
      // which can make imports by JS runtimes slightly faster,
      // but makes the generated code harder to follow.
      hoistTransitiveImports: false,
    },
  };
}

/**
 * @type {(options: {inputFile: string; outFile: string}) => import('rollup').RollupOptions}
 */
function umdBuildConfig({ inputFile, outFile }) {
  return {
    input: inputFile,
    plugins: [
      tsPlugin({
        exclude: [...testPatterns],
        compilerOptions: {
          sourceMap: true,
          inlineSources: true,
          removeComments: true,
          declaration: false,
        },
      }),
    ],
    output: {
      plugins: [terserPlugin()],
      format: 'iife',
      file: outFile,
      sourcemap: true,
      generatedCode: 'es2015',
    },
  };
}

/**
 * @type {(options: {inputFiles: string[]; outDir: string}) => import('rollup').RollupOptions}
 */
function declarationOptions({ inputFiles, outDir }) {
  return {
    plugins: [dtsPlugin()],
    input: mapInputs(inputFiles),
    output: [
      {
        format: 'esm',
        dir: outDir,
        generatedCode: 'es2015',
        ...fileNames('d.mts'),
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      {
        format: 'cjs',
        dir: outDir,
        generatedCode: 'es2015',
        ...fileNames('d.ts'),
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
  };
}

/** @type {(srcFiles: string[]) => Record<string, string>} */
function mapInputs(srcFiles) {
  return Object.fromEntries(
    srcFiles.map(file => [
      file.replace(/^(\.\/)?src\//, '').replace(/\.[cm]?(js|ts)$/, ''),
      path.join(import.meta.dirname, file),
    ])
  );
}

function fileNames(extension = 'js') {
  return {
    entryFileNames: `[name].${extension}`,
    chunkFileNames: `_chunk/[name]-[hash:6].${extension}`,
  };
}

/** @type {(dir: string) => void} */
function clearDir(dir) {
  const dirPath = path.join(import.meta.dirname, dir);
  if (dir && fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`cleared: ${dir}`);
  }
}
