/**
 * Creates a function that invokes `func` with arguments reversed.
 *
 * @param {F} func The function to flip arguments for.
 * @returns {(...args: ReverseParameters<Parameters<F>>) => ReturnType<F>} Returns the new flipped function.
 *
 * @example
 * function fn(a: any, b: any, c: any, d: any) {
 *   return [a, b, c, d];
 * }
 *
 * const flipped = flip(fn);
 * flipped('a', 'b', 'c', 'd'); // => ['d', 'c', 'b', 'a']
 */
export function flip<F extends (...args: any[]) => any>(
  func: F
): (...args: ReverseParameters<Parameters<F>>) => ReturnType<F> {
  return function (this: any, ...args: ReverseParameters<Parameters<F>>) {
    return func.apply(this, args.reverse());
  };
}

type ReverseParameters<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...ReverseParameters<Rest>, First]
  : [];
