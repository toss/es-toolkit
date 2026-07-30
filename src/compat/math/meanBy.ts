import { sumBy } from './sumBy.ts';
import { identity } from '../../function/identity.ts';
import { ValueIteratee } from '../_internal/ValueIteratee.ts';
import { iteratee as iterateeToolkit } from '../util/iteratee.ts';

/**
 * Calculates the average of an array of numbers when applying
 * the `iteratee` function to each element.
 *
 * If the array is empty, this function returns `NaN`.
 *
 * Values of `undefined` are skipped when summing, but they are still counted
 * in the divisor, which is the length of `items`.
 *
 * @template T - The type of elements in the array.
 * @param items An array to calculate the average.
 * @param iteratee
 * The criteria used to determine the maximum value.
 *  - If a **function** is provided, it extracts a numeric value from each element.
 *  - If a **string** is provided, it is treated as a key to extract values from the objects.
 *  - If a **[key, value]** pair is provided, it matches elements with the specified key-value pair.
 *  - If an **object** is provided, it matches elements that contain the specified properties.
 * @returns The average of all the numbers as determined by the `iteratee` function.
 *
 * @example
 * meanBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: 2
 * meanBy([], x => x.a); // Returns: NaN
 * meanBy([[2], [3], [1]], 0); // Returns: 2
 * meanBy([{ a: 2 }, { a: 3 }, { a: 1 }], 'a'); // Returns: 2
 * meanBy([{ a: 1 }, {}], 'a'); // Returns: 0.5
 */
export function meanBy<T>(items: ArrayLike<T> | null | undefined, iteratee?: ValueIteratee<T>): number {
  const length = items == null ? 0 : items.length;

  if (!length) {
    return NaN;
  }

  return sumBy(items, iterateeToolkit(iteratee ?? identity)) / length;
}
