/**
 * Finds the element in an array that has the minimum value when applying
 * the `getValue` function to each element.
 *
 * @template T - The type of elements in the array.
 * @param {[T, ...T[]]} items The nonempty array of elements to search.
 * @param {(element: T) => number} getValue A function that selects a numeric value from each element.
 * @returns {T} The element with the minimum value as determined by the `getValue` function.
 * @example
 * minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 1 }
 * minBy([], x => x.a); // Returns: undefined
 */
export function minBy<T>(items: readonly [T, ...T[]], getValue: (element: T) => number): T;
/**
 * Finds the element in an array that has the minimum value when applying
 * the `getValue` function to each element.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} items The array of elements to search.
 * @param {(element: T) => number} getValue A function that selects a numeric value from each element.
 * @returns {T | undefined} The element with the minimum value as determined by the `getValue` function.
 * @example
 * minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 1 }
 * minBy([], x => x.a); // Returns: undefined
 */
export function minBy<T>(items: readonly T[], getValue: (element: T) => number): T | undefined;
/**
 * Finds the element in an array that has the minimum value when applying
 * the `getValue` function to each element.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} items The array of elements to search.
 * @param {(element: T) => number} getValue A function that selects a numeric value from each element.
 * @returns {T | undefined} The element with the minimum value as determined by the `getValue` function.
 * @example
 * minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 1 }
 * minBy([], x => x.a); // Returns: undefined
 */
export function minBy<T>(items: readonly T[], getValue: (element: T) => number): T | undefined {
  let minElement = items[0];
  let min = Infinity;

  for (const element of items) {
    const value = getValue(element);
    if (value < min) {
      min = value;
      minElement = element;
    }
  }

  return minElement;
}
