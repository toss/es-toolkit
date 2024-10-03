/**
 * Splits an array into two groups based on a predicate function.
 *
 * This function takes an array and a predicate function. It returns a tuple of two arrays:
 * the first array contains elements for which the predicate function returns true, and
 * the second array contains elements for which the predicate function returns false.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to partition.
 * @param {(value: T) => boolean} isInTruthy - A predicate function that determines
 * whether an element should be placed in the truthy array. The function is called with each
 * element of the array.
 * @returns {[T[], T[]]} A tuple containing two arrays: the first array contains elements for
 * which the predicate returned true, and the second array contains elements for which the
 * predicate returned false.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const isEven = x => x % 2 === 0;
 * const [even, odd] = partition(array, isEven);
 * // even will be [2, 4], and odd will be [1, 3, 5]
 */
export function partition<T>(arr: readonly T[], isInTruthy: (value: T) => boolean): [truthy: T[], falsy: T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (isInTruthy(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }

  return [truthy, falsy];
}
