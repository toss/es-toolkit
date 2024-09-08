import { flatten } from '../array/flatten.ts';

/**
 * Creates a function that invokes `func` with arguments arranged according to the specified `indices`
 * where the argument value at the first index is provided as the first argument,
 * the argument value at the second index is provided as the second argument, and so on.
 *
 * @template F The type of the function to re-arrange.
 * @param {F} func The function to rearrange arguments for.
 * @param {Array<number | number[]>} indices The arranged argument indices.
 * @returns {(...args: any[]) => ReturnType<F>} Returns the new function.
 *
 * @example
 * const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
 * const rearrangedGreet = rearg(greet, 1, 0);
 * console.log(rearrangedGreet('World', 'Hello')); // Output: "Hello, World!"
 */
export function rearg<F extends (...args: any[]) => any>(
  func: F,
  ...indices: Array<number | number[]>
): (...args: any[]) => ReturnType<F> {
  const flattenIndices = flatten(indices);

  return function (this: any, ...args: any[]) {
    const reorderedArgs: any[] = flattenIndices.map(i => args[i]).slice(0, args.length);

    for (let i = reorderedArgs.length; i < args.length; i++) {
      reorderedArgs.push(args[i]);
    }

    return func.apply(this, reorderedArgs);
  };
}
