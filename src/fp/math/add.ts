/**
 * Creates a data-last operator that adds `addend` to its input.
 *
 * Designed for composition: it can transform the value flowing through a
 * {@link pipe}, or serve as the callback of an operator such as `map`.
 *
 * @param addend - The number to add to the input.
 * @returns A function that maps a `number` to `value + addend`.
 *
 * @example
 * import { pipe, map, add } from 'es-toolkit/fp';
 *
 * pipe(3, add(2)); // => 5
 * pipe([1, 2, 3], map(add(10))); // => [11, 12, 13]
 */
export function add(addend: number): (value: number) => number {
  return (value: number): number => value + addend;
}
