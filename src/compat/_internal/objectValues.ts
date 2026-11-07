/**
 * Returns the values of the own enumerable string-keyed properties of `object`, like `Object.values`,
 * which is not available on ES2015 engines.
 *
 * @template T - The type of the values.
 * @param object - The object to query.
 * @returns An array of the property values.
 */
export function objectValues<T>(object: Record<PropertyKey, T>): T[];
export function objectValues(object: object): any[];
export function objectValues(object: any): any[] {
  const keys = Object.keys(object);
  const result = new Array(keys.length);

  for (let i = 0; i < keys.length; i++) {
    result[i] = object[keys[i]];
  }

  return result;
}
