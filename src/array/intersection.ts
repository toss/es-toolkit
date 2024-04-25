/**
 * @name intersection
 * @description
 * Returns the intersection of two arrays.
 * @example
 * intersection([1, 2], [1, 3]) === [1]
 * intersection([1, 2, 3], [2, 3, 4]) === [2, 3]
 */
export function intersection<T>(firstArr: T[], secondArr: T[]): T[] {
  return firstArr.filter(item => {
    return secondArr.includes(item);
  });
}