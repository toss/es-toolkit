// @ts-check

import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { globSync } from 'glob';
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
      input: './src/browser.ts',
      outFile: 'browser.global.js',
      outDir: 'umd',
    }),
  ];
};

function findLibFiles() {
  /** @type {{ exports: Record<string, string>}} */
  const packageJson = createRequire(import.meta.url)('./package.json');
  const entrypoints = Object.values(packageJson.exports).filter(f => /^(\.\/)?src\//.test(f) && f.endsWith('.ts'));

  const allFiles = globSync('./src/**/*.ts', {
    cwd: import.meta.dirname,
    ignore: [...testPatterns],
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
        },
      }),
    ],
    output: {
      format,
      dir: outDir,
      ...fileNames(extension),
      // Using preserveModules virtually disables extracting common chunks,
      // leading to a result that is a mirror of the TypeScript source.
      preserveModules: isESM,
      manualChunks: isESM ? undefined : manualChunks,
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
 * @type {(options: {input: string; outFile: string; outDir: string}) => import('rollup').RollupOptions}
 */
function umdBuildConfig({ input, outFile, outDir }) {
  return {
    input,
    plugins: [
      tsPlugin({
        exclude: [...testPatterns],
        compilerOptions: {
          sourceMap: false,
          declaration: false,
        },
      }),
    ],
    output: {
      format: 'umd',
      dir: outDir,
      file: outFile,
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

/** @type {import('rollup').GetManualChunk} */
function manualChunks(id) {
  const category = id.match(/\/src\/([\w-_]+)\//)?.[1];
  if (category) {
    return category;
  }
}

/** @type {(dir: string) => void} */
function clearDir(dir) {
  const dirPath = path.join(import.meta.dirname, dir);
  if (dir && fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`cleared: ${dir}`);
  }
}
