/**
 * Polyfills for the ES2015 tier (Chrome 51+ / Safari 10+), on top of the
 * minimal set: `@vitejs/plugin-legacy` injects core-js automatically, but
 * `AbortController` (used by `debounce` and `delay`) and `structuredClone`
 * are Web APIs outside core-js.
 *
 * This exact file is referenced from docs/browser-support.md.
 */
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
import './minimal.mjs';
