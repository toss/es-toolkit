/**
 * Creates a function that is restricted to invoking the provided function `func` once.
 * Repeated calls to the function will return the value from the first invocation.
 *
 * @template F - The type of function.
 * @param func - The function to restrict.
 * @returns A new function that invokes `func` once and caches the result.
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
export function once<F extends () => any>(func: F): F {
  let called = false;
  let cache: ReturnType<F> | undefined;

  return function () {
    if (called) {
      return cache;
    }

    const result = func();

    called = true;
    cache = result;

    return result;
  } as F;
}
