// Legacy fixture: what docs/browser-support.md tells users targeting
// ES2015-era browsers (Chrome 51+ / Safari 10+) to do.
//
// Uses the bigint-free case set: BigInt literals cannot be transpiled, so
// `es-toolkit/bigint` is excluded from this support tier (documented).
// @vitejs/plugin-legacy injects core-js polyfills into the legacy chunk;
// structuredClone is not part of core-js, so the minimal polyfill file is
// still imported for it.
import { cases, namespaces } from '../../generated/cases-legacy.mjs';
import { start } from '../../harness/entry.mjs';
import '../../polyfills/legacy.mjs';

start({ cases, namespaces });
