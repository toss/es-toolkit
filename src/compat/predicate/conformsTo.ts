import { ConformsPredicateObject } from '../_internal/ConformsPredicateObject.ts';

/**
 * Checks if `object` conforms to `source` by invoking the predicate properties of `source` with the corresponding property values of `object`.
 *
 * Note: This method is equivalent to `conforms` when source is partially applied.
 *
 * @template T - The type of the target object.
 * @param {T} target The object to inspect.
 * @param {ConformsPredicateObject<T>} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 *
 * @example
 *
 * const object = { 'a': 1, 'b': 2 };
 * const source = {
 *   'a': (n) => n > 0,
 *   'b': (n) => n > 1
 * };
 *
 * console.log(conformsTo(object, source)); // => true
 *
 * const source2 = {
 *   'a': (n) => n > 1,
 *   'b': (n) => n > 1
 * };
 *
 * console.log(conformsTo(object, source2)); // => false
 */
export function conformsTo<T>(target: T, source: ConformsPredicateObject<T>): boolean {
  if (source == null) {
    return true;
  }

  if (target == null) {
    return Object.keys(source).length === 0;
  }

  const keys = Object.keys(source) as Array<keyof T>;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const predicate = source[key];
    const value = target[key];

    if (value === undefined && !(key in (target as any))) {
      return false;
    }

    if (typeof predicate === 'function' && !predicate(value)) {
      return false;
    }
  }
  return true;
}
