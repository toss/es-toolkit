/**
 * Creates a function that invokes func, with up to n arguments, ignoring any additional arguments.
 *
 *
 * @template F - The type of the function.
 * @param {F} func - The function to cap arguments for.
 * @param {number} n - The arity cap.
 * @param {any} guard - Enables use as an iteratee for methods like `map`.
 * @returns {(...args: any[]) => ReturnType<F>} Returns the new capped function.
 */
export const ary = <F extends (...args: any[]) => any>(
  func: F,
  n: number = func.length,
  guard?: any
): ((...args: any[]) => ReturnType<F>) => {
  n = guard ? func.length : n;
  const length = Number.parseInt(n.toString());
  if (Number.isNaN(length) || length < 0) {
    n = 0;
  }
  return function (this: any, ...args: Parameters<F>) {
    return func.apply(this, args.slice(0, n));
  };
};
