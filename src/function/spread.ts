/**
 * Creates a function that invokes `func` with the `this` binding of the create function and an array of arguments much like `Function#apply`.
 *
 * @template F The type of the function to spread arguments over.
 * @param {F} func The function to spread arguments over.
 * @param {number} startIndex The start position of the spread.
 * @returns {(...args: any[]) => ReturnType<F>} A new function that invokes `func` with the spread arguments.
 */
export function spread<F extends (...args: any[]) => any>(
  func: F,
  startIndex: number = 0
): (...args: any[]) => ReturnType<F> {
  return function (this: any, ...args: any[]) {
    const array = args[startIndex];
    const params = args.slice(0, startIndex);

    if (array) {
      params.push(...array);
    }
    return func.apply(this, params);
  };
}
