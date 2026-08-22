/**
 * The type of the object returned by `omitBy`.
 *
 * Objects with a string or number index signature, such as `Record<string, T>`, already allow any key
 * to be missing, so their type is preserved. Objects with known keys become `Partial` because
 * `omitBy` may drop any of them.
 *
 * @template T - The type of object.
 */
export type OmitByResult<T> = string extends keyof T ? T : number extends keyof T ? T : Partial<T>;

/**
 * Creates a new object composed of the properties that do not satisfy the predicate function.
 *
 * This function takes an object and a predicate function, and returns a new object that
 * includes only the properties for which the predicate function returns false.
 *
 * @template T - The type of object.
 * @param obj - The object to omit properties from.
 * @param shouldOmit - A predicate function that determines
 * whether a property should be omitted. It takes the property's key and value as arguments and returns `true`
 * if the property should be omitted, and `false` otherwise.
 * @returns A new object with the properties that do not satisfy the predicate function. If `obj` has a
 * string or number index signature, the returned object keeps the same type. Otherwise it is `Partial<T>`,
 * since any of the known properties may have been omitted.
 *
 * @example
 * const obj = { a: 1, b: 'omit', c: 3 };
 * const shouldOmit = (value) => typeof value === 'string';
 * const result = omitBy(obj, shouldOmit);
 * // result will be { a: 1, c: 3 }
 *
 * @example
 * // Objects with an index signature keep their type.
 * const scores: Record<string, number> = { alice: 90, bob: 50 };
 * const passed = omitBy(scores, score => score < 60);
 * // passed is Record<string, number>, not Partial<Record<string, number>>
 */
export function omitBy<T extends Record<string, any>>(
  obj: T,
  shouldOmit: (value: T[keyof T], key: keyof T) => boolean
): OmitByResult<T> {
  const result: Partial<T> = {};

  const keys = Object.keys(obj) as Array<keyof T>;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];

    if (!shouldOmit(value, key)) {
      result[key] = value;
    }
  }

  return result as OmitByResult<T>;
}
