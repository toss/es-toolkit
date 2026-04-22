/**
 * Base constructor for {@link TimeoutError}. Uses `DOMException` when it is
 * available on the global object (browsers, modern Node, Deno, Bun) so that
 * `instanceof DOMException` checks keep working, and falls back to `Error`
 * on runtimes that don't expose `DOMException` (notably Hermes, which powers
 * React Native / Expo by default, as well as older Node versions).
 */
const TimeoutErrorBase: { new (message?: string): Error } = typeof DOMException !== 'undefined' ? DOMException : Error;

/**
 * An error class representing a timeout operation.
 *
 * Extends `DOMException` on runtimes that provide it, otherwise extends `Error`.
 * Either way, `instanceof Error` is always true.
 *
 * @augments DOMException
 */
export class TimeoutError extends TimeoutErrorBase {
  constructor(message = 'The operation was timed out') {
    super(message);
  }
}
