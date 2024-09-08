/**
 * Attempts to invoke `func`, returning either the result or the caught error object.
 * Any additional arguments are provided to `func` when it's invoked.
 *
 * @template F The type of the function to attempt.
 * @param {F} func The function to attempt.
 * @param {Parameters<F>} args The arguments to provide to `func`.
 * @returns {ReturnType<F> | Error} Returns the result of `func` or the caught error object.
 */
export function attempt<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>): ReturnType<F> | Error {
  try {
    return func(...args);
  } catch (e: any) {
    return e instanceof Error ? e : new Error(e);
  }
}
