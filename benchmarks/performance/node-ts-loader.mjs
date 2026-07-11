import { transformSync } from 'esbuild';
import { readFileSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { fileURLToPath } from 'node:url';

// Lets benchmarks run on native ESM without the Vite module runner
// (see vitest.config.mts):
//
// - `src/` uses extensionless relative imports (e.g. `./predicate/isNumber`),
//   and lodash subpaths (e.g. `lodash/fp`) have no `exports` map, so failed
//   imports are retried with explicit extensions.
// - `.ts` files are transpiled with esbuild, which strips type-only imports
//   that Node.js's own type stripping would leave behind, while keeping
//   real ESM bindings.
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      for (const suffix of ['.ts', '/index.ts', '.js']) {
        try {
          return nextResolve(specifier + suffix, context);
        } catch {
          // fall through to the original error
        }
      }
      throw error;
    }
  },
  load(url, context, nextLoad) {
    if (url.startsWith('file://') && url.endsWith('.ts')) {
      const filePath = fileURLToPath(url);
      const { code } = transformSync(readFileSync(filePath, 'utf8'), {
        loader: 'ts',
        format: 'esm',
        sourcemap: 'inline',
        sourcefile: filePath,
      });
      return { format: 'module', source: code, shortCircuit: true };
    }
    try {
      return nextLoad(url, context);
    } catch (error) {
      // The Yarn PnP ESM loader defers CommonJS modules (e.g. lodash) to the
      // CJS loader by returning `source: undefined`, which Node.js rejects
      // when a sync load hook is registered. Read the source explicitly
      // instead; PnP's patched `fs` can read into zip archives.
      if (error?.code === 'ERR_INVALID_RETURN_PROPERTY_VALUE' && url.startsWith('file://')) {
        return { format: 'commonjs', source: readFileSync(fileURLToPath(url), 'utf8'), shortCircuit: true };
      }
      throw error;
    }
  },
});
