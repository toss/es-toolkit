// Falls back to `Error` on runtimes without `DOMException` (e.g. Hermes / React Native).
// Type stays `typeof DOMException` so the emitted `.d.ts` keeps `AbortError extends DOMException`.
const AbortErrorBase: typeof DOMException =
  typeof DOMException !== 'undefined' ? DOMException : (Error as unknown as typeof DOMException);

/**
 * An error class representing an aborted operation.
 * @augments DOMException
 */
export class AbortError extends AbortErrorBase {
  constructor(message = 'The operation was aborted') {
    super(message);
  }
}
