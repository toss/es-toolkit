/**
 * It creates a function that only executes after being called a specified number of times.
 * This is particularly useful for scenarios involving events or asynchoronous operations
 * where an action should occur after a certain number of invocations.
 *
 * @template F - The type of the function to be invoked.
 * @param {number} n - The number of calls required before `func` is invoked.
 * @param {F} func - The function to be invoked.
 * @returns {F} - A new function that:
 * - Tracks the number of calls.
 * - Calls `func` only after being invoked `n` times.
 * - Returns `undefiend` if fewer than `n` calls have been made.
 * @throws {Error} - Throws an error if `n` is a negative integer.
 * @example
 *
 * const afterFn = after(3, () => {
 *  console.log("happened.")
 * });
 *
 * // Will not log anything.
 * afterFn()
 * // Will not log anything.
 * afterFn()
 * // Will log 'called'.
 * afterFn() // print "called"
 */

export const after = <F extends (...args: any[]) => any>(n: number, func: F): F => {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error(`n must be a non-negative integer.`);
  }

  let counter = 0;
  return ((...args: Parameters<F>) => {
    if (++counter >= n) {
      return func(...args);
    }
    return undefined;
  }) as F;
};
