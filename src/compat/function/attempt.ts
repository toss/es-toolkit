/**
 * Attempts to execute a function with the provided arguments.
 * If the function throws an error, it catches the error and returns it.
 * If the caught error is not an instance of Error, it wraps it in a new Error.
 *
 * @param {F} func - The function to be executed.
 * @param {...Parameters<F>} args - The arguments to pass to the function.
 * @returns {ReturnType<F> | Error} The return value of the function if successful, or an Error if an exception is thrown.
 *
 * @template F - The type of the function being attempted.
 *
 * @example
 * // Example 1: Successful execution
 * const result = attempt((x, y) => x + y, 2, 3);
 * console.log(result); // Output: 5
 *
 * @example
 * // Example 2: Function throws an error
 * const errorResult = attempt(() => {
 *   throw new Error("Something went wrong");
 * });
 * console.log(errorResult); // Output: Error: Something went wrong
 *
 * @example
 * // Example 3: Non-Error thrown
 * const nonErrorResult = attempt(() => {
 *   throw "This is a string error";
 * });
 * console.log(nonErrorResult); // Output: Error: This is a string error
 */
export function attempt<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>): ReturnType<F> | Error {
  try {
    return func(...args);
  } catch (e: any) {
    return e instanceof Error ? e : new Error(e);
  }
}
