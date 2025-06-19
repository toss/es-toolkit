/**
 * Finds the element in an array that has the minimum value.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | null | undefined} [items] - The array of elements to search. Defaults to an empty array.
 * @returns {T | undefined} - The element with the minimum value, or undefined if the array is empty.
 */
export function min<T>(items?: ArrayLike<T> | null | undefined): T | undefined {
  if (!items || items.length === 0) {
    return undefined;
  }

  let minResult: T | undefined = undefined;

  for (let i = 0; i < items.length; i++) {
    const current = items[i];

    if (current == null || Number.isNaN(current) || typeof current === 'symbol') {
      continue;
    }

    if (minResult === undefined || current < (minResult as T)) {
      minResult = current;
    }
  }

  return minResult;
}
