import { isNil } from '../predicate';

/**
 * Unzips an array of arrays, applying an `iteratee` function to regrouped elements.
 *
 * @template T, R
 * @param {T[][]} target - The nested array to unzip. This is an array of arrays,
 * where each inner array contains elements to be unzipped.
 * @param {(...args: T[]) => R} iteratee - A function to transform the unzipped elements.
 * @returns {R[]} A new array of unzipped and transformed elements. 
 *
 * @example
 * const nestedArray = [[1, 2], [3, 4], [5, 6]];
 * const result = unzipWith(nestedArray, (item, item2, item3) => item + item2 + item3);
 * // result will be [9, 12]
 */
export function unzipWith<T, R>(target: readonly T[][], iteratee: (...args: T[]) => R): R[] {
  const maxLength = Math.max(...target.map(innerArray => innerArray.length));
  const result: R[] = new Array(maxLength);

  for (let i = 0; i < maxLength; i++) {
    const group = new Array(target.length);

    for (let j = 0; j < target.length; j++) {
      group[j] = target[j][i];
    }

    result[i] = iteratee(...group);
  }

  return result;
}
