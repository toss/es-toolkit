import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

// The Vite setup documented in docs/browser-support.md for supporting
// ES2015-era browsers (Chrome 51+ / Safari 10+): @vitejs/plugin-legacy
// transpiles with Babel (including Unicode-property regexes, which esbuild
// cannot lower) and injects core-js polyfills based on usage.
//
// Note: `es-toolkit/bigint` cannot be part of this tier — BigInt literals
// have no ES2015 equivalent. As long as your app does not import it, the
// bigint code never enters the bundle.
export default defineConfig({
  root: import.meta.dirname,
  base: './',
  plugins: [
    legacy({
      targets: ['chrome >= 51', 'safari >= 10', 'ios_saf >= 10', 'firefox >= 54', 'edge >= 15'],
    }),
  ],
  build: {
    outDir: '../../dist-fixtures/vite-legacy',
    emptyOutDir: true,
  },
});
