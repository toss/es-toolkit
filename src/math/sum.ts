/**
 * @name sum
 * @description Return the sum of given values.
 * ```typescript
 * function sum(...nums: number[] | number[][]): number;
 * ```
 *
 * @example
 * sum(1, 2, 3) === 6
 * sum(...[1, 2, 3]) === 6
 * sum([1, 2, 3]) === 6
 */
export function sum(...nums: number[] | number[][]) {
  return nums.flat().reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}
