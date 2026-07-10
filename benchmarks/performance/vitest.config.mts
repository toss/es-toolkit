import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    name: 'benchmarks',
    watch: false,
    // Native module resolution cannot handle the TypeScript sources in
    // `src/`, so register loader hooks that resolve and transpile them
    // while keeping real ESM bindings.
    execArgv: ['--import', fileURLToPath(new URL('./node-ts-loader.mjs', import.meta.url))],
    benchmark: {
      include: ['**/*.bench.ts'],
    },
    experimental: {
      // Run benchmarks with native `import` so that imported bindings are not
      // wrapped in module-runner getters, which would distort measurements.
      // See https://github.com/vitest-dev/vitest/issues/6543
      viteModuleRunner: false,
      // Benchmarks do not use `vi.mock` or `import.meta.vitest`, so Vitest's
      // Node.js loader hooks are unnecessary; they also conflict with the
      // Yarn PnP ESM loader.
      nodeLoader: false,
    },
  },
});
