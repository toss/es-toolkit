/**
 * Creates a new object composed of the picked object properties.
 *
 * This function takes an object and an array of keys, and returns a new object that
 * includes only the properties corresponding to the specified keys.
 *
 * The return type depends on whether a tuple or a variable-length array is passed:
 * - Tuple (e.g. `['a', 'b']`): returns `Pick<T, 'a' | 'b'>` — all keys are guaranteed present.
 * - Array (e.g. `keys: ('a' | 'b')[]`): returns `Partial<Pick<T, 'a' | 'b'>>` — only some keys may be present.
 *
 * @template T - The type of object.
 * @template Keys - The type of the keys array (tuple or array).
 * @param {T} obj - The object to pick keys from.
 * @param {Keys} keys - An array of keys to be picked from the object.
 * @returns A new object with the specified keys picked.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(obj, ['a', 'c']);
 * // result will be { a: 1, c: 3 }
 */
export function pick<T extends Record<string, any>, Keys extends ReadonlyArray<keyof T>>(
  obj: T,
  keys: readonly [...Keys]
): number extends Keys['length'] ? Partial<Pick<T, Keys[number]>> : Pick<T, Keys[number]> {
  const result = {} as any;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (Object.hasOwn(obj, key)) {
      result[key] = obj[key];
    }
  }

  return result;
}
