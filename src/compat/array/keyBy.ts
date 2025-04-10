import { reduce } from './reduce.ts';
import { identity } from '../../function';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isObjectLike } from '../predicate/isObjectLike.ts';
import { iteratee as createIteratee } from '../util/iteratee.ts';

/**
 * Creates an object composed of keys generated from the results of running each element
 * of `collection` through `iteratee`. The corresponding value of each key is the last
 * element responsible for generating the key.
 *
 * Supports array-like and object-like collections. The `iteratee` can be:
 * - A function: `(value) => key`
 * - A property name: `'id'`
 * - A property-value pair: `['type', 'admin']`
 * - A partial object: `{ type: 'admin' }`
 *
 * @example
 * // Using an array of objects
 * keyBy([{ id: 'a' }, { id: 'b' }], 'id');
 * // => { a: { id: 'a' }, b: { id: 'b' } }
 *
 * @example
 * // Using a function iteratee
 * keyBy(['a', 'b', 'c'], val => val.toUpperCase());
 * // => { A: 'a', B: 'b', C: 'c' }
 *
 * @param collection - The collection to iterate over (array-like or null/undefined).
 * @param iteratee - The function or shorthand to generate the key.
 * @returns An object composed of keys generated from the iteratee.
 */
export function keyBy<T>(
  collection: ArrayLike<T> | null | undefined,
  iteratee?: ((value: T) => unknown) | PropertyKey | [keyof T, unknown] | Partial<T> | null
): Record<string, T>;

/**
 * Overload for object collections. Allows iteration over object values.
 *
 * @example
 * // Using an object
 * keyBy({ a: { id: 1 }, b: { id: 2 } }, 'id');
 * // => { '1': { id: 1 }, '2': { id: 2 } }
 *
 * @param collection - The object to iterate over.
 * @param iteratee - The function or shorthand to generate the key.
 * @returns An object composed of keys generated from the iteratee.
 */
export function keyBy<T extends object>(
  collection: T | null | undefined,
  iteratee?: ((value: T[keyof T]) => unknown) | PropertyKey | [keyof T[keyof T], unknown] | Partial<T[keyof T]> | null
): Record<string, T[keyof T]>;

/**
 * Core implementation of `keyBy`, applies the iteratee to each value in the collection
 * and assigns it to the resulting object using the computed key.
 *
 * @param collection - The array-like or object-like collection to process.
 * @param iteratee - Optional function or shorthand to determine keys.
 * @returns An object keyed by the results of the iteratee.
 */
export function keyBy<T>(
  collection: unknown,
  iteratee?: ((value: T) => unknown) | PropertyKey | [keyof T, unknown] | Partial<T> | null
): Record<string, T> {
  if (!isArrayLike(collection) && !isObjectLike(collection)) {
    return {};
  }

  const keyFn = iteratee == null ? identity : createIteratee(iteratee);

  return reduce(
    collection,
    (result, value) => {
      const key = keyFn(value);
      result[key] = value;
      return result;
    },
    {} as Record<string, T>
  );
}
