/**
 * Check if the object includes the target value using SameValueZero comparison.
 *
 * It only checks the given object's own enumerable string-keyed property values.
 * But, if `options.allowSymbolKeys` is set to `true`, it will also check the object's own enumerable symbol-keyed property values.
 *
 * @template T - The object type.
 * @param {T extends unknown[] ? never : T} object - The object to check. (Array is not allowed)
 * @param {unknown} target - The target value to check.
 * @param {{ allowSymbolKeyed: boolean }} [options] - The options object.
 * @param {boolean} [options.allowSymbolKeyed] - Whether to include symbol-keyed property values in the check. Default is `false`.
 * @returns {boolean} `true` if the object includes the target value, `false` otherwise.
 *
 * @example
 * includes({ a: 1, b: 'a', c: NaN }, 1); // true
 * includes({ a: 1, b: 'a', c: NaN }, 'a'); // true
 * includes({ a: 1, b: 'a', c: NaN }, NaN); // true
 *
 * includes({ [Symbol('sym1')]: 1 }, 1); // false
 * includes({ [Symbol('sym1')]: 1 }, 1, { allowSymbolKeyed: true }); // true
 */
export function includes<T extends object>(
  object: T extends unknown[] ? never : T,
  target: unknown,
  options = { allowSymbolKeyed: false }
): boolean {
  const keys = options.allowSymbolKeyed ? Reflect.ownKeys(object) : Object.keys(object);

  for (let i = 0; i < keys.length; i++) {
    const value = Reflect.get(object, keys[i]);

    // SameValueZero comparison for early return
    if (value === target || (Number.isNaN(value) && Number.isNaN(target))) {
      return true;
    }
  }

  return false;
}
