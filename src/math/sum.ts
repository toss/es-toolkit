/**
 * @name sum
 * @description Return the sum of given values.
 * ```typescript
 * function sum(nums: number[]): number;
 * ```
 *
 * @example
 * sum(1, 2, 3) === 6
 * sum(...[1, 2, 3]) === 6
 * sum([1, 2, 3]) === 6
 */
export function sum(nums: number[]) {
  let result = 0;

  for (const num of nums) {
    result += num;
  }

  return result;
}
