import { createRequire } from 'node:module';
import path from 'node:path';
import type { Plugin } from 'rolldown';
import { transformSync } from 'rolldown/experimental';
import { defineConfig } from 'tsdown';

const packageJson = createRequire(import.meta.url)('./package.json') as {
  exports: Record<string, string>;
};

const SERVER_ENTRY = './src/server/index.ts';

// Per-function subpaths ("./array/*") are wildcards, not entries: the unbundled build
// already emits one file per module reached from the category entry.
const allEntrypoints = Object.values(packageJson.exports).filter(
  (f): f is string => typeof f === 'string' && /^(\.\/)?src\//.test(f) && f.endsWith('.ts') && !f.includes('*')
);
// "./util/hash" is a conditional export (node/default), so its entries are not
// collected above and are wired explicitly: the browser implementation builds
// as a neutral entry, and the node implementation gets its own node-platform
// build below.
const neutralEntrypoints = [...allEntrypoints.filter(f => f !== SERVER_ENTRY), './src/util/hash/browser.ts'];

// Published code is lowered to ES2019 syntax, so that `?.` and `??` can be used freely
// in the source while `es-toolkit/compat` still loads on ES2015 engines such as Node.js 6.
// Only the modules `es-toolkit/compat` reaches are lowered; the rest is published as written.
// TODO: lower only the syntax compat needs once Oxc supports per-feature lowering
// (https://github.com/oxc-project/oxc/issues/15373).
function lowerCompatToES2019(): Plugin {
  const compatModules = new Set<string>();

  return {
    name: 'lower-compat-to-es2019',

    // 1. Once the module graph is complete, collect every module the compat entry reaches.
    buildEnd() {
      const queue = [path.resolve(packageJson.exports['./compat'])];

      for (const id of queue) {
        if (!compatModules.has(id)) {
          compatModules.add(id);
          queue.push(...(this.getModuleInfo(id)?.importedIds ?? []));
        }
      }
    },

    // 2. Lower only the output files that come from those modules.
    renderChunk(code, chunk) {
      if (!chunk.moduleIds.some(id => compatModules.has(id))) {
        return null;
      }

      return transformSync(chunk.fileName, code, { target: 'es2019' }).code;
    },
  };
}

export default defineConfig([
  {
    entry: neutralEntrypoints,
    format: ['esm', 'cjs'],
    outDir: 'dist',
    platform: 'neutral',
    plugins: [lowerCompatToES2019()],
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
    entry: [SERVER_ENTRY],
    format: ['esm', 'cjs'],
    outDir: 'dist/server',
    platform: 'node',
    unbundle: true,
    fixedExtension: false,
    dts: true,
    sourcemap: false,
    treeshake: false,
    clean: false,
    exports: false,
    attw: false,
    publint: false,
  },
  {
    // The node implementation of `es-toolkit/util/hash` imports `node:crypto`,
    // so it cannot be part of the neutral build. It is bundled (not unbundled)
    // so that its `serialize` dependency does not escape the outDir.
    entry: ['./src/util/hash/node.ts'],
    format: ['esm', 'cjs'],
    outDir: 'dist/util/hash',
    platform: 'node',
    fixedExtension: false,
    dts: true,
    sourcemap: false,
    treeshake: true,
    clean: false,
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
