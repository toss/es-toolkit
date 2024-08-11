import { rest as restToolkit } from '../../function/rest.ts';
/**
 * Creates a function that invokes `func` with the this binding of the created function and arguments from start and beyond provided as an array.
 *
 * @template F The type of the function.
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} start The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 *
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
