/**
 * Creates a function that is restricted to invoking the provided function `func` once.
 * Repeated calls to the function will return the value from the first invocation.
 *
 * @template F - The type of function.
 * @param {F} func - The function to restrict.
 * @returns {() => ReturnType<F>} A new function that invokes `func` once and caches the result.
 *
 * @example
 * const initialize = once(() => {
 *   console.log('Initialized!');
 *   return true;
 * });
 *
 * initialize(); // Logs: 'Initialized!' and returns true
 * initialize(); // Returns true without logging
 */
export function once<F extends (...args: unknown[]) => any>(func: F): () => ReturnType<F> {
  let called = false;
  let cache: ReturnType<F>;

  return function () {
    if (!called) {
      called = true;
      cache = func();
    }

    return cache;
  };
}
