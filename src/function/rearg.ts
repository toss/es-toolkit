import { flatten } from '../array';

/**
 * Creates a function that invokes `func` with arguments arranged according to the specified `indexes`
 * where the argument value at the first index is provided as the first argument,
 * the argument value at the second index is provided as the second argument, and so on.
 *
 * @template F The type of the function to re-arrange.
 * @param {F} func The function to rearrange arguments for.
 * @param {(number | number[])[]} indexes The arranged argument indexes.
 * @returns {(...args: any[]) => ReturnType<F>} Returns the new function.
 */
export function rearg<F extends (...args: any[]) => any>(
  func: F,
  ...indexes: (number | number[])[]
): (...args: any[]) => ReturnType<F> {
  const flattenIndexes = flatten(indexes);

  return function (this: any, ...args: any[]) {
    const reorderedArgs: any[] = flattenIndexes.map(i => args[i]).slice(0, args.length);

    for (let i = reorderedArgs.length; i < args.length; i++) {
      reorderedArgs.push(args[i]);
    }

    return func.apply(this, reorderedArgs);
  };
}
