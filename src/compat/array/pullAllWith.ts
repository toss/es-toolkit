/**
 * Removes elements from an array that match the given comparator function and returns the modified array.
 *
 * This function mutates the original array by removing elements that match the criteria defined by `comparator`.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array from which elements will be removed.
 * @param {T[]} values - The values to compare against, which determine which elements should be removed.
 * @param {(a: T, b: T) => boolean} comparator - A function that compares elements in `array` with `values`. If it returns `true`, the element is removed.
 * @returns {T[]} - The modified array after removing matching elements.
 *
 * @example
 * import pullAllWith from './pullAllWith';
 * import isEqual from '../predicate';
 *
 * const array = [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }];
 * const valuesToRemove = [{ x: 3, y: 4 }];
 *
 * const result = pullAllWith(array, valuesToRemove, isEqual);
 *
 * console.log(result); // [{ x: 1, y: 2 }, { x: 5, y: 6 }]
 * console.log(array);  // [{ x: 1, y: 2 }, { x: 5, y: 6 }]
 */
export function pullAllWith<T>(array: T[], values: T[], comparator: (a: T, b: T) => boolean): T[] {
  let resultIndex = 0;

  for (let i = 0; i < array.length; i++) {
    // For handling sparse arrays
    if (!(i in array)) {
      if (!values.includes(undefined as T)) {
        delete array[resultIndex++];
      }
      continue;
    }

    const shouldRemove = values.some(value => comparator(array[i], value));

    if (!shouldRemove) {
      array[resultIndex++] = array[i];
    }
  }

  array.length = resultIndex;

  return array;
}
