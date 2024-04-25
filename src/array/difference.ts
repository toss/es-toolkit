/**
 * @name difference
 * Returns the difference of two arrays.
 * @param firstArr The array to get the difference from
 * @param secondArr The elements to exclude from `firstArr`
 */
export function difference<T>(firstArr: T[], secondArr: T[]): T[] {
  return firstArr.filter(item => {
    return !secondArr.includes(item)
  });
}