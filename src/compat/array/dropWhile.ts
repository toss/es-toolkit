import { dropWhile as dropWhileToolkit } from '../../array/dropWhile.ts';
import { identity } from '../../function/identity.ts';
import { ListIteratee } from '../_internal/ListIteratee.ts';
import { toArray } from '../_internal/toArray.ts';
import { property } from '../object/property.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Creates a slice of array excluding elements dropped from the beginning.
 * Elements are dropped until predicate returns falsey.
 * The predicate is invoked with three arguments: (value, index, array).
 *
 * @template T - The type of elements in the array
 * @param {ArrayLike<T> | null | undefined} arr - The array to query
 * @param {ListIteratee<T>} [predicate=identity] - The function invoked per iteration
 * @returns {T[]} Returns the slice of array
 *
 * @example
 * dropWhile([1, 2, 3], n => n < 3)
 * // => [3]
 *
 * dropWhile([{ a: 1, b: 2 }, { a: 1, b: 3 }], { a: 1 })
 * // => [{ a: 1, b: 3 }]
 *
 * dropWhile([{ a: 1, b: 2 }, { a: 1, b: 3 }], ['a', 1])
 * // => [{ a: 1, b: 3 }]
 *
 * dropWhile([{ a: 1, b: 2 }, { a: 1, b: 3 }], 'a')
 * // => []
 */
export function dropWhile<T>(arr: ArrayLike<T> | null | undefined, predicate: ListIteratee<T> = identity): T[] {
  if (!isArrayLike(arr)) {
    return [];
  }

  return dropWhileImpl(toArray(arr), predicate);
}

function dropWhileImpl<T>(arr: readonly T[], predicate: ListIteratee<T>): T[] {
  switch (typeof predicate) {
    case 'function': {
      return dropWhileToolkit(arr, (item, index, arr) => Boolean(predicate(item, index, arr)));
    }
    case 'object': {
      if (Array.isArray(predicate) && predicate.length === 2) {
        const key = predicate[0];
        const value = predicate[1];

        return dropWhileToolkit(arr, matchesProperty(key, value));
      } else {
        return dropWhileToolkit(arr, matches(predicate));
      }
    }
    case 'number':
    case 'symbol':
    case 'string': {
      return dropWhileToolkit(arr, property(predicate));
    }
  }
}
