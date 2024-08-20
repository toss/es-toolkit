import { rest as restToolkit } from '../../function/rest.ts';

/**
 * Creates a function that transforms the arguments of the provided function `func`.
 * The transformed arguments are passed to `func` such that the arguments starting from a specified index
 * are grouped into an array, while the previous arguments are passed as individual elements.
 *
 * @template F - The type of the function being transformed.
 * @param {F} func - The function whose arguments are to be transformed.
 * @param {number} [start=func.length - 1] - The index from which to start grouping the remaining arguments into an array.
 *                                            Defaults to `func.length - 1`, grouping all arguments after the last parameter.
 * @returns {(...args: any[]) => ReturnType<F>} A new function that, when called, returns the result of calling `func` with the transformed arguments.
 *
 * The transformed arguments are:
 * - The first `start` arguments as individual elements.
 * - The remaining arguments from index `start` onward grouped into an array.
 * @example
 * function fn(a, b, c) {
 *   return [a, b, c];
 * }
 *
 * // Using default start index (func.length - 1, which is 2 in this case)
 * const transformedFn = rest(fn);
 * console.log(transformedFn(1, 2, 3, 4)); // [1, 2, [3, 4]]
 *
 * // Using start index 1
 * const transformedFnWithStart = rest(fn, 1);
 * console.log(transformedFnWithStart(1, 2, 3, 4)); // [1, [2, 3, 4]]
 *
 * // With fewer arguments than the start index
 * console.log(transformedFn(1)); // [1, undefined, []]
 */
export function rest<F extends (...args: any[]) => any>(
  func: F,
  start = func.length - 1
): (...args: any[]) => ReturnType<F> {
  start = Number.parseInt(start as any, 10);

  if (Number.isNaN(start) || start < 0) {
    start = func.length - 1;
  }

  return restToolkit(func, start);
}
