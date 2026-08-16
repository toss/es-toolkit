// Native fixture: the built dist exactly as npm users receive it — no
// transpilation (target: esnext), no polyfills.
import { cases, namespaces } from '../../generated/cases.mjs';
import { start } from '../../harness/entry.mjs';

start({ cases, namespaces });
