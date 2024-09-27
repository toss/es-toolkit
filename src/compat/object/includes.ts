import { isString } from '../predicate/isString';
import { toInteger } from '../util/toInteger';

/**
 * Checks if value is in source.
 * If source is a string, it's checked for a substring of value, otherwise SameValueZero is used for equality comparisons.
 * If fromIndex is negative, it's used as the offset from the end of source.
 *
 * @param {unknown[] | object | string | null | undefined} source - The source to search in.
 * @param {unknown} [target] - The target value to check.
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

  if (isString(source) || Array.isArray(source)) {
    if (safeIndex < 0) {
      safeIndex = Math.max(0, source.length + safeIndex);
    }

    if (safeIndex > source.length) {
      return false;
    }

    // Typescript sets type of first argument of `String.prototype.includes` as `string`, but it can handle all types of `target` except `RegExp`.
    // So it is safe to insert `target` directly to `String.prototype.includes` except `RegExp`.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return source.includes(target, safeIndex);
  }

  const keys = Object.keys(source);

  if (safeIndex < 0) {
    safeIndex = Math.max(0, keys.length + safeIndex);
  }

  // Not using `Object.values` because it always creates an array of all values.
  for (let i = safeIndex; i < keys.length; i++) {
    const value = Reflect.get(source, keys[i]);

    // This condition is the SameValueZero comparison.
    if (value === target || (Number.isNaN(value) && Number.isNaN(target))) {
      return true;
    }
  }

  return false;
}
