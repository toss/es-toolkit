/**
 * The type of the object returned by `pickBy`.
 *
 * Objects with a string or number index signature, such as `Record<string, T>`, already allow any key
 * to be missing, so their type is preserved. Objects with known keys become `Partial` because
 * `pickBy` may drop any of them.
 *
 * @template T - The type of object.
 */
export type PickByResult<T> = string extends keyof T ? T : number extends keyof T ? T : Partial<T>;

/**
 * Creates a new object composed of the properties that satisfy the predicate function.
 *
 * This function takes an object and a predicate function, and returns a new object that
 * includes only the properties for which the predicate function returns true.
 *
 * @template T - The type of object.
 * @param obj - The object to pick properties from.
 * @param shouldPick - A predicate function that determines
 * whether a property should be picked. It takes the property's key and value as arguments and returns `true`
 * if the property should be picked, and `false` otherwise.
 * @returns A new object with the properties that satisfy the predicate function. If `obj` has a
 * string or number index signature, the returned object keeps the same type. Otherwise it is `Partial<T>`,
 * since any of the known properties may have been dropped.
 *
 * @example
 * const obj = { a: 1, b: 'pick', c: 3 };
 * const shouldPick = (value) => typeof value === 'string';
 * const result = pickBy(obj, shouldPick);
 * // result will be { b: 'pick' }
 *
 * @example
 * // Objects with an index signature keep their type.
 * const scores: Record<string, number> = { alice: 90, bob: 50 };
 * const passed = pickBy(scores, score => score >= 60);
 * // passed is Record<string, number>, not Partial<Record<string, number>>
 */
export function pickBy<T extends Record<string, any>>(
  obj: T,
  shouldPick: (value: T[keyof T], key: keyof T) => boolean
): PickByResult<T> {
  const result: Partial<T> = {};

  const keys = Object.keys(obj) as Array<keyof T>;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];

    if (shouldPick(value, key)) {
      result[key] = value;
    }
  }

  return result as PickByResult<T>;
}
