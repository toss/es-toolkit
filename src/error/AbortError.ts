// Falls back to `Error` on runtimes without `DOMException` (e.g. Hermes / React Native).
const AbortErrorBase: { new (message?: string): Error } = typeof DOMException !== 'undefined' ? DOMException : Error;

/**
 * An error class representing an aborted operation.
 * @augments DOMException
 */
export class AbortError extends AbortErrorBase {
  constructor(message = 'The operation was aborted') {
    super(message);
  }
}
