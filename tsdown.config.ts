import { createRequire } from 'node:module';
import path from 'node:path';
import type { Plugin } from 'rolldown';
import { transformSync } from 'rolldown/experimental';
import { defineConfig } from 'tsdown';

const packageJson = createRequire(import.meta.url)('./package.json') as {
  exports: Record<string, string>;
};

const SERVER_ENTRY = './src/server/index.ts';

const allEntrypoints = Object.values(packageJson.exports).filter(
  (f): f is string => typeof f === 'string' && /^(\.\/)?src\//.test(f) && f.endsWith('.ts')
);
// "./util/hash" is a conditional export (node/default), so its entries are not
// collected above and are wired explicitly: the browser implementation builds
// as a neutral entry, and the node implementation gets its own node-platform
// build below.
const neutralEntrypoints = [...allEntrypoints.filter(f => f !== SERVER_ENTRY), './src/util/hash/browser.ts'];

// `es-toolkit/compat` must run on Node.js 6, so only the modules it reaches are lowered to ES2019.
const compatModules = new Set<string>();

const lowerCompatModules: Plugin = {
  name: 'lower-compat-modules',
  buildEnd() {
    const pending = [path.resolve('src/compat/index.ts')];

    while (pending.length > 0) {
      const id = pending.pop()!;

      if (!compatModules.has(id)) {
        compatModules.add(id);
        pending.push(...this.getModuleInfo(id)!.importedIds);
      }
    }
  },
  renderChunk(code, chunk) {
    if (/\.d\.[cm]?ts$/.test(chunk.fileName) || !chunk.moduleIds.some(id => compatModules.has(id))) {
      return null;
    }

    return transformSync(chunk.fileName, code, { target: 'es2019' }).code;
  },
};

export default defineConfig([
  {
    entry: neutralEntrypoints,
    format: ['esm', 'cjs'],
    outDir: 'dist',
    platform: 'neutral',
    plugins: [lowerCompatModules],
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
