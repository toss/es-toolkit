/**
 * Creates an `AsyncDisposable` object that runs the given callback when it is disposed.
 *
 * Use it with `await using` declarations from
 * [Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management)
 * to ensure asynchronous cleanup code runs and is awaited when the enclosing scope exits,
 * even if an error is thrown.
 *
 * For synchronous cleanup, use {@link defer} with `using` instead.
 *
 * @param callback - The cleanup function to run on dispose. Its result is awaited.
 * @returns An `AsyncDisposable` object that invokes and awaits `callback` when disposed.
 *
 * @example
 * const connection = await connect();
 *
 * async function run() {
 *   await using cleanup = deferAsync(async () => {
 *     await connection.close();
 *   });
 *
 *   await connection.query('SELECT 1');
 * }
 *
 * await run(); // The connection is closed after `run` finishes.
 */
export function deferAsync(callback: () => void | PromiseLike<void>): AsyncDisposable {
  return {
    [Symbol.asyncDispose]: async () => {
      await callback();
    },
  };
}
