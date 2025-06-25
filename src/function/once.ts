/**
 * Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of the first invocation.
 *
 * @template T - The type of the function.
 * @param {T} func - The function to restrict.
 * @returns {T} Returns the new restricted function.
 *
 * @example
 * var initialize = once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 */
export function once<T extends (...args: any) => any>(func: T): T;

/**
 * Creates a function that is restricted to invoking the provided function `func` once.
 * Repeated calls to the function will return the value from the first invocation.
 *
 * @template F - The type of function.
 * @param {F} func - The function to restrict.
 * @returns {(...args: Parameters<F>) => ReturnType<F>} A new function that invokes `func` once and caches the result.
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
export function once<F extends (() => any) | ((...args: any[]) => void)>(func: F): F {
  let called = false;
  let cache: ReturnType<F>;

  return function (...args: Parameters<F>): ReturnType<F> {
    if (!called) {
      called = true;
      cache = func(...args);
    }

    return cache;
  } as F;
}
