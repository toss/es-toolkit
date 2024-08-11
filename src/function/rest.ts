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
  return function (this: any, ...args: any[]) {
    const rest = args.slice(start);
    const params = args.slice(0, start);
    while (params.length < start) {
      params.push(undefined);
    }
    return func.apply(this, [...params, rest]);
  };
}
