import { isString } from '../predicate/isString';
import { toInteger } from '../util/toInteger';
/**
 * Checks if value is in source.
 * If source is a string, it's checked for a substring of value, otherwise SameValueZero is used for equality comparisons.
 * If fromIndex is negative, it's used as the offset from the end of source.
 *
 * @param {unknown[] | object | string | null | undefined} source - The source to search in.
 * @param {unknown} [target] - The value to search for.
 * @param {unknown} [fromIndex] - The index to search from.
 * @param {unknown} [guard] - Enables use as an iteratee for methods like `_.every`.
 * @returns {boolean} `true` if the object includes the target value, `false` otherwise.
 *
 * @example
 * includes({ a: 1, b: 'a', c: NaN }, 1); // true
 * includes({ a: 1, b: 'a', c: NaN }, 'a'); // true
 * includes({ a: 1, b: 'a', c: NaN }, NaN); // true
 * includes({ [Symbol('sym1')]: 1 }, 1); // false
 */
export function includes(
  source: readonly unknown[] | object | string | null | undefined,
  target?: unknown,
  fromIndex?: unknown,
  guard?: unknown
): boolean {
  if (source == null) {
    return false;
  }

  let safeIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;

  if (isString(source)) {
    if (safeIndex > source.length || target instanceof RegExp) {
      return false;
    }

    if (safeIndex < 0) {
      safeIndex = Math.max(0, source.length + safeIndex);
    }

    return source.includes(target as any, safeIndex);
  }

  if (Array.isArray(source)) {
    return source.includes(target, safeIndex);
  }

  const keys = [];

  // Not using `Object.keys` because it can't access inherited properties.
  for (const key in source) {
    keys.push(key);
  }

  if (safeIndex < 0) {
    safeIndex = Math.max(0, keys.length + safeIndex);
  }

  for (let i = safeIndex; i < keys.length; i++) {
    const value = Reflect.get(source, keys[i]);

    // This condition is the SameValueZero comparison.
    if (value === target || (Number.isNaN(value) && Number.isNaN(target))) {
      return true;
    }
  }

  return false;
}
