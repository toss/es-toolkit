/**
 * Creates a function that negates the result of the predicate function.
 *
 * @template F - The type of the function to negate.
 * @param {F} func - The function to negate.
 * @returns {F} The new negated function, which negates the boolean result of `func`.
 */
export function negate<F extends (...args: any[]) => boolean>(func: F): F {
  return ((...args: any[]) => !func(...args)) as F;
}
