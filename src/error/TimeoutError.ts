// Falls back to `Error` on runtimes without `DOMException` (e.g. Hermes / React Native).
const TimeoutErrorBase: { new (message?: string): Error } = typeof DOMException !== 'undefined' ? DOMException : Error;

/**
 * An error class representing a timeout operation.
 * @augments DOMException
 */
export class TimeoutError extends TimeoutErrorBase {
  constructor(message = 'The operation was timed out') {
    super(message);
  }
}
