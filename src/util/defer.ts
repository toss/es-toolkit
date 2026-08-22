/**
 * Creates a `Disposable` object that runs the given callback when it is disposed.
 *
 * Use it with `using` declarations from
 * [Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management)
 * to ensure cleanup code runs when the enclosing scope exits, even if an error is thrown.
 *
 * For asynchronous cleanup, use {@link deferAsync} with `await using` instead.
 *
 * @param callback - The cleanup function to run on dispose.
 * @returns A `Disposable` object that invokes `callback` when disposed.
 *
 * @example
 * const logs: string[] = [];
 *
 * function run() {
 *   using cleanup = defer(() => logs.push('cleanup'));
 *   logs.push('body');
 * }
 *
 * run();
 * console.log(logs); // ['body', 'cleanup']
 */
export function defer(callback: () => void): Disposable {
  return {
    [Symbol.dispose]: () => {
      callback();
    },
  };
}
