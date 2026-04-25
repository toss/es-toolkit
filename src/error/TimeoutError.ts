// Falls back to `Error` on runtimes without `DOMException` (e.g. Hermes / React Native).
// Type stays `typeof DOMException` so the emitted `.d.ts` keeps `TimeoutError extends DOMException`.
const TimeoutErrorBase: typeof DOMException =
  typeof DOMException !== 'undefined' ? DOMException : (Error as unknown as typeof DOMException);

/**
 * An error class representing a timeout operation.
 * @augments DOMException
 */
export class TimeoutError extends TimeoutErrorBase {
  constructor(message = 'The operation was timed out') {
    super(message);
  }
}
