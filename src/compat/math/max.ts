/**
 * Finds the element in an array that has the maximum value.
 *
 * @template T - The type of elements in the array.
 * @param [items] - The array of elements to search. Defaults to an empty array.
 * @returns The element with the maximum value, or undefined if the array is empty.
 */
export function max<T>(items: ArrayLike<T> | null | undefined): T | undefined {
  if (!items || items.length === 0) {
    return undefined;
  }

  let maxResult: T | undefined = undefined;

  for (let i = 0; i < items.length; i++) {
    const current = items[i];

    if (current == null || Number.isNaN(current) || typeof current === 'symbol') {
      continue;
    }

    if (maxResult === undefined || current > (maxResult as T)) {
      maxResult = current;
    }
  }

  return maxResult;
}
