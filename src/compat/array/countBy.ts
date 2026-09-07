import { ValueIteratee } from '../_internal/ValueIteratee.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { iteratee as iterateeToolkit } from '../util/iteratee.ts';

/**
 * Creates an object composed of keys generated from the results of running each element of collection through
 * iteratee. The corresponding value of each key is the number of times the key was returned by iteratee. The
 * iteratee is invoked with one argument: (value).
 *
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @return Returns the composed aggregate object.
 *
 * @example
 * countBy([6.1, 4.2, 6.3], Math.floor); // => { '4': 1, '6': 2 }
 * countBy(['one', 'two', 'three'], 'length'); // => { '3': 2, '5': 1 }
 */
export function countBy<T>(
  collection: ArrayLike<T> | null | undefined,
  iteratee?: ValueIteratee<T>
): Record<string, number>;

export function countBy<T extends object>(
  collection: T | null | undefined,
  iteratee?: ValueIteratee<T[keyof T]>
): Record<string, number>;

export function countBy(collection: any, iteratee?: any): Record<string, number> {
  if (collection == null) {
    return {} as Record<string, number>;
  }

  const array = isArrayLike(collection) ? Array.from(collection) : Object.values(collection);
  const mapper = iterateeToolkit(iteratee ?? undefined) as (value: any) => any;

  // The counts live on a plain object, matching lodash. Reading a count therefore has to go
  // through `Object.hasOwn`, so that an inherited member such as `constructor` is not mistaken
  // for an existing count, and `__proto__` has to be defined rather than assigned, so that it
  // becomes an own property instead of replacing the prototype.
  const result = {} as Record<string, number>;

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const key = mapper(item);
    const count = (Object.hasOwn(result, key) ? result[key] : 0) + 1;

    if (key === '__proto__') {
      Object.defineProperty(result, key, { value: count, writable: true, enumerable: true, configurable: true });
    } else {
      result[key] = count;
    }
  }

  return result;
}
