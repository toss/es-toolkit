/**
 * Creates a data-last operator that multiplies its input by `multiplicand`.
 *
 * Designed for composition: it can transform the value flowing through a
 * {@link pipe}, or serve as the callback of an operator such as `map`.
 *
 * @param multiplicand - The number to multiply the input by.
 * @returns A function that maps a `number` to `value * multiplicand`.
 *
 * @example
 * import { pipe, map, multiply } from 'es-toolkit/fp';
 *
 * pipe(3, multiply(2)); // => 6
 * pipe([1, 2, 3], map(multiply(3))); // => [3, 6, 9]
 */
export function multiply(multiplicand: number): (value: number) => number {
  return (value: number): number => value * multiplicand;
}
