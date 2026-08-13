/**
 * The minimal polyfill set that extends es-toolkit's browser support from
 * Chrome 98 / Safari 15.4 down to Chrome 80 / Safari 14.1.
 *
 * This exact file is referenced from docs/browser-support.md — it is the
 * recommended setup, verified in CI against real Chrome 80 and WebKit 14.1.
 */
import 'core-js/actual/aggregate-error';
import 'core-js/actual/array/at';
import 'core-js/actual/array/find-last';
import 'core-js/actual/array/find-last-index';
import 'core-js/actual/object/has-own';
import structuredCloneShim from '@ungap/structured-clone';

if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = structuredCloneShim;
}
