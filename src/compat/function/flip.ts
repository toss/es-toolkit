/**
 * Reverses the order of arguments for a given function.
 *
 * @template F - The type of the function being flipped.
 * @param {F} func - The function whose arguments will be reversed.
 * @returns {(...args: Reversed<Parameters<F>>) => ReturnType<F>} A new function that takes the
 * reversed arguments and returns the result of calling `func`.
 *
 * @example
 * function fn(a: string, b: string, c: string, d: string) {
 *   return [a, b, c, d];
 * }
 *
 * const flipped = flip(fn);
 * flipped('a', 'b', 'c', 'd'); // => ['d', 'c', 'b', 'a']
 */

export function flip<F extends (...args: any[]) => any>(func: F): (...args: Reversed<Parameters<F>>) => ReturnType<F> {
  return function (this: any, ...args: Reversed<Parameters<F>>) {
    return func.apply(this, args.reverse());
  };
}

type Reversed<T extends any[]> = T extends [infer First, ...infer Rest] ? [...Reversed<Rest>, First] : [];
