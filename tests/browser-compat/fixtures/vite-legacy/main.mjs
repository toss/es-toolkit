// Legacy fixture: what docs/browser-support.md tells users targeting
// ES2015-era browsers (Chrome 51+ / Safari 10+) to do.
//
// Uses the bigint-free case set: BigInt cannot be transpiled or polyfilled,
// so `es-toolkit/bigint` only supports browsers with native BigInt
// (documented). @vitejs/plugin-legacy injects core-js polyfills into the
// legacy chunk; the shared polyfill file covers the Web APIs outside core-js.
import { cases, namespaces } from '../../generated/cases-legacy.mjs';
import { start } from '../../harness/entry.mjs';
import '../../polyfills/minimal.mjs';

start({ cases, namespaces });
