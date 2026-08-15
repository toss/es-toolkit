import { globalThis } from './globalThis.ts';

// Falls back to `Error` on runtimes without `DOMException` (e.g. Hermes / React Native).
// Type stays `typeof DOMException` so the emitted `.d.ts` keeps `AbortError extends DOMException`.
export const DOMException: typeof globalThis.DOMException =
  typeof globalThis.DOMException !== 'undefined'
    ? globalThis.DOMException
    : (Error as unknown as typeof globalThis.DOMException);
