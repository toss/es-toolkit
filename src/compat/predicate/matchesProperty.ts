import { toKey } from '../_internal/toKey.ts';
import { cloneDeep } from '../object/cloneDeep.ts';
import { get } from '../object/get.ts';
import { has } from '../object/has.ts';
import { isMatch } from './isMatch.ts';

/**
 * Creates a function that checks if a given target object matches a specific property value.
 *
 * The returned function takes a target object and determines if the property at the
 * specified path within the target object is equal to the given value.
 *
 * @param property - The property path to check within the target object.
 *     This can be a single property key or an array of property keys.
 * @param source - The value to compare against the property value in the target object.
 *
 * @returns - A function that takes a target object and returns
 *     `true` if the property value at the given path in the target object matches the provided value,
 *     otherwise returns `false`.
 *
 * @example
 * // Using a single property key
 * const checkName = matchesProperty('name', 'Alice');
 * console.log(checkName({ name: 'Alice' })); // true
 * console.log(checkName({ name: 'Bob' })); // false
 *
 * // Using an array of property keys
 * const checkNested = matchesProperty(['address', 'city'], 'New York');
 * console.log(checkNested({ address: { city: 'New York' } })); // true
 * console.log(checkNested({ address: { city: 'Los Angeles' } })); // false
 */
export function matchesProperty(
  property: PropertyKey | readonly PropertyKey[],
  source: unknown
): (target?: unknown) => boolean {
  property = Array.isArray(property) ? property : toKey(property);
  source = cloneDeep(source);

  return function (target?: unknown) {
    const result = get(target, property as PropertyKey | PropertyKey[]);

    if (result === undefined) {
      return has(target, property as PropertyKey | PropertyKey[]);
    }

    if (source === undefined) {
      return result === undefined;
    }

    return isMatch(result, source);
  };
}
