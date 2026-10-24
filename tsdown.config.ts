import { existsSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import type { Plugin } from 'rolldown';
import { parseSync, transformSync } from 'rolldown/experimental';
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

// `es-toolkit/compat` must load on ES2015 engines such as Node.js 6, so every module it
// reaches is lowered to ES2019 syntax, which keeps `?.` and `??` usable in the source.
// The rest of the library is published as written, so classes like `Queue` keep their
// native class fields and private fields.
// TODO: lower only the syntax compat needs once Oxc supports per-feature lowering
// (https://github.com/oxc-project/oxc/issues/15373).
const compatModules = collectModules('./src/compat/index.ts');

const lowerCompatModules: Plugin = {
  name: 'lower-compat-modules',
  transform(code, id) {
    if (!compatModules.has(id) || id.endsWith('.d.ts')) {
      return null;
    }

    const result = transformSync(id, code, { target: 'es2019', sourcemap: false });

    if (result.errors.length > 0) {
      throw new Error(`Failed to lower ${id}: ${result.errors.map(error => error.message).join('\n')}`);
    }

    return result.code;
  },
};

function collectModules(entry: string): Set<string> {
  const modules = new Set<string>();
  const pending = [path.resolve(entry)];

  while (pending.length > 0) {
    const file = pending.pop()!;

    if (modules.has(file)) {
      continue;
    }

    modules.add(file);

    for (const statement of parseSync(file, readFileSync(file, 'utf8')).program.body) {
      if (
        (statement.type === 'ImportDeclaration' ||
          statement.type === 'ExportAllDeclaration' ||
          statement.type === 'ExportNamedDeclaration') &&
        statement.source?.value.startsWith('.')
      ) {
        pending.push(resolveModule(path.resolve(path.dirname(file), statement.source.value)));
      }
    }
  }

  return modules;
}

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
    plugins: [lowerCompatModules],
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

function resolveModule(specifier: string): string {
  for (const candidate of [specifier, `${specifier}.ts`, path.join(specifier, 'index.ts')]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return candidate;
    }
  }

  throw new Error(`Cannot resolve ${specifier}`);
}
