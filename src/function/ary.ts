/**
 * Creates a function that invokes func, with up to n arguments, ignoring any additional arguments.
 *
 * @template F - The type of the function.
 * @param {F} func - The function to cap arguments for.
 * @param {number} n - The arity cap.
 * @returns {(...args: any[]) => ReturnType<F>} Returns the new capped function.
 */
export function ary<F extends (...args: any[]) => any>(func: F, n: number): (...args: any[]) => ReturnType<F> {
  return function (this: any, ...args: Parameters<F>) {
    return func.apply(this, args.slice(0, n));
  };
}
