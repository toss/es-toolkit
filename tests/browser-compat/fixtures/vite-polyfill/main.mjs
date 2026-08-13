// Downlevel fixture: what docs/browser-support.md tells Vite users to do.
// The polyfill module installs its globals when imported; start() only runs
// after every import is evaluated, so es-toolkit code always sees them.
import { start } from '../../harness/entry.mjs';
import '../../polyfills/minimal.mjs';

start();
