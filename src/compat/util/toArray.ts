import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isMap } from '../predicate/isMap.ts';

/**
 * Converts a value to an array.
 *
 * @param {unknown} value - The value to convert.
 * @returns {any[]} Returns the converted array.
 *
 * @example
 * toArray({ 'a': 1, 'b': 2 }) // => returns [1,2]
 * toArray('abc') // => returns ['a', 'b', 'c']
 * toArray(1) // => returns []
 * toArray(null) // => returns []
 */

export function toArray(value?: unknown): any[] {
  if (value == null) {
    return [];
  }

  if (isArrayLike(value) || isMap(value)) {
    return Array.from(value);
  }

  if (typeof value === 'object') {
    return Object.values(value);
  }

  return [];
}
