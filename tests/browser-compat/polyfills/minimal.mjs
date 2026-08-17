import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
import 'core-js/actual/aggregate-error';
import 'core-js/actual/array/at';
import 'core-js/actual/array/find-last';
import 'core-js/actual/array/find-last-index';
import 'core-js/actual/object/has-own';
import structuredCloneShim from '@ungap/structured-clone';

if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = structuredCloneShim;
}
