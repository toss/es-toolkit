/**
 * Finds the element in an array that has the minimum value when applying
 * the `getValue` function to each element.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} items The array of elements to search.
 * @param {(element: T) => number} getValue A function that selects a numeric value from each element.
 * @returns {T} The element with the minimum value as determined by the `getValue` function.
 * @example
 * minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 1 }
 * minBy([], x => x.a); // Returns: undefined
 */
export function minBy<T>(items: T[], getValue: (element: T) => number): T | undefined {
  if (items.length === 0) {
    return undefined;
  }
  let minElement = items[0];
  let min = getValue(minElement);

  for (let i = 1; i < items.length; i++) {
    const item = items[i];
    const value = getValue(item);
    if (value < min) {
      min = value;
      minElement = item;
    }
  }

  return minElement;
}
