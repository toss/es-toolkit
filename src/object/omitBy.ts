/**
 * Creates a new object composed of the properties that do not satisfy the predicate function.
 *
 * This function takes an object and a predicate function, and returns a new object that 
 * includes only the properties for which the predicate function returns false.
 *
 * @param {T} obj - The object to omit properties from.
 * @param {(value: T[string], key: string) => boolean} shouldOmit - A predicate function that determines 
 * whether a property should be omitted. It takes the property's key and value as arguments and returns `true` 
 * if the property should be omitted, and `false` otherwise.
 * @returns {Partial<T>} A new object with the properties that do not satisfy the predicate function.
 *
 * @example
 * const obj = { a: 1, b: 'omit', c: 3 };
 * const shouldOmit = (key, value) => typeof value === 'string';
 * const result = omitBy(obj, shouldOmit);
 * // result will be { a: 1, c: 3 }
 */
export function omitBy<T extends Record<string, any>>(obj: T, shouldOmit: (value: T[keyof T], key: string) => boolean): Partial<T> {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (shouldOmit(value, key)) {
      continue;
    }

    (result as any)[key] = value;
  }

  return result;
}