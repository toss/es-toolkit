import { isArrayLike } from '../predicate/isArrayLike.ts';
import { iteratee as iterateeToolkit } from '../util/iteratee.ts';

/**
 * Creates an object composed of keys generated from the results of running each element of `collection`
 * through `iteratee`. The corresponding value of each key is the number of times the key was returned by `iteratee`.
 * Supports array-like collections.
 *
 * @example
 * countBy([6.1, 4.2, 6.3], Math.floor); // => { '4': 1, '6': 2 }
 * countBy(['one', 'two', 'three'], 'length'); // => { '3': 2, '5': 1 }
 */
export function countBy<T, K extends PropertyKey = PropertyKey>(
  collection: ArrayLike<T> | null | undefined,
  iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined
): Record<K, number>;

/**
 * Creates an object composed of keys generated from the results of running each element of `collection`
 * through `iteratee`. The corresponding value of each key is the number of times the key was returned by `iteratee`.
 * Supports plain object collections.
 *
 * @example
 * countBy({ a: 'apple', b: 'banana' }, v => v[0]); // => { 'a': 1, 'b': 1 }
 * countBy({ a: 'foo', b: 'bar' }, 'length'); // => { '3': 2 }
 */
export function countBy<T, K extends PropertyKey = PropertyKey>(
  collection: Record<PropertyKey, T> | null | undefined,
  iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined
): Record<K, number>;

/**
 * Creates an object composed of keys generated from the results of running each element of `collection`
 * through `iteratee`. The corresponding value of each key is the number of times the key was returned.
 *
 * @example
 * countBy([6.1, 4.2, 6.3], Math.floor); // => { '4': 1, '6': 2 }
 * countBy(['one', 'two', 'three'], 'length'); // => { '3': 2, '5': 1 }
 * countBy({ a: 'apple', b: 'banana' }, v => v[0]); // => { 'a': 1, 'b': 1 }
 */
export function countBy<T, K extends PropertyKey>(
  collection: ArrayLike<T> | Record<PropertyKey, T> | null | undefined,
  iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined
): Record<K, number> {
  if (collection == null) {
    return {} as Record<K, number>;
  }

  const array = isArrayLike(collection) ? Array.from(collection) : Object.values(collection);
  const mapper = iterateeToolkit(iteratee ?? undefined) as (item: T) => K;

  const result = Object.create(null) as Record<K, number>;

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const key = mapper(item);
    result[key] = (result[key] ?? 0) + 1;
  }

  return result;
}

