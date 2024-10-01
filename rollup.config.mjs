// @ts-check
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import dtsPlugin from 'rollup-plugin-dts';
import terserPlugin from '@rollup/plugin-terser';
import tsPlugin from '@rollup/plugin-typescript';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @type {{
 *   exports: Record<string, string>;
 *   publishConfig: { browser: string };
 * }}
 */
const packageJson = createRequire(import.meta.url)('./package.json');

const testPatterns = ['**/*.bench.ts', '**/*.spec.ts', '**/*.test.ts'];

export default () => {
  clearDir('dist');

  const entrypoints = Object.values(packageJson.exports).filter(f => /^(\.\/)?src\//.test(f) && f.endsWith('.ts'));

  return [
    libBuildOptions({
      format: 'esm',
      extension: 'mjs',
      entrypoints,
      outDir: 'dist',
      sourcemap: false,
    }),
    libBuildOptions({
      format: 'cjs',
      extension: 'js',
      entrypoints,
      outDir: 'dist',
      sourcemap: false,
    }),
    declarationOptions({
      entrypoints,
      outDir: 'dist',
    }),
    browserBuildConfig({
      inputFile: './src/compat/index.ts',
      outFile: packageJson.publishConfig.browser,
      name: '_',
      sourcemap: true,
    }),
  ];
};

/**
 * @type {(options: {
 *   entrypoints: string[];
 *   format: 'esm' | 'cjs';
 *   extension: 'js' | 'cjs' | 'mjs';
 *   outDir: string;
 *   sourcemap: boolean;
 * }) => import('rollup').RollupOptions}
 */
function libBuildOptions({ entrypoints, extension, format, outDir, sourcemap }) {
  const isESM = format === 'esm';

  return {
    input: mapInputs(entrypoints),
    plugins: [
      tsPlugin({
        exclude: [...testPatterns],
        compilerOptions: {
          sourceMap: sourcemap,
          inlineSources: sourcemap || undefined,
          removeComments: !sourcemap,
          declaration: false,
        },
      }),
    ],
    output: {
      format,
      dir: outDir,
      ...fileNames(extension),
      // Using preserveModules disables bundling and the creation of chunks,
      // leading to a result that is a mirror of the input module graph.
      preserveModules: isESM,
      sourcemap,
      generatedCode: 'es2015',
      // Hoisting transitive imports adds bare imports in modules,
      // which can make imports by JS runtimes slightly faster,
      // but makes the generated code harder to follow.
      hoistTransitiveImports: false,
    },
  };
}

/**
 * @type {(options: {inputFile: string; outFile: string; name: string, sourcemap: boolean}) => import('rollup').RollupOptions}
 */
function browserBuildConfig({ inputFile, outFile, name, sourcemap }) {
  return {
    input: inputFile,
    plugins: [
      tsPlugin({
        exclude: [...testPatterns],
        compilerOptions: {
          sourceMap: sourcemap,
          inlineSources: sourcemap || undefined,
          removeComments: true,
          declaration: false,
        },
      }),
    ],
    output: {
      plugins: [
        // Minify with terser, but with a configuration that optimizes for
        // readability in browser DevTools (after re-indenting by DevTools).
        terserPlugin({
          // Terser defaults to ES5 for syntax it adds or rewrites
          ecma: 2020,
          // Readable function names (not just in final export)
          keep_fnames: true,
          // Turn off compress.sequences to keep the assignments to the toolkit
          // object readable, instead of turning them into a huge list of
          // comma-separated expressions.
          compress: { sequences: false },
        }),
      ],
      format: 'iife',
      name,
      file: outFile,
      sourcemap,
      generatedCode: 'es2015',
    },
  };
}

/**
 * @type {(options: {entrypoints: string[]; outDir: string}) => import('rollup').RollupOptions}
 */
function declarationOptions({ entrypoints, outDir }) {
  return {
    plugins: [dtsPlugin()],
    input: mapInputs(entrypoints),
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
    srcFiles.map(file => [file.replace(/^(\.\/)?src\//, '').replace(/\.[cm]?(js|ts)$/, ''), join(__dirname, file)])
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
  const dirPath = join(__dirname, dir);
  if (dir && fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`cleared: ${dir}`);
  }
}
