/**
 * Checks if `object` conforms to `source` by invoking the predicate properties of `source` with the corresponding property values of `object`.
 *
 * Note: This method is equivalent to `conforms` when source is partially applied.
 *
 * @param {Record<PropertyKey, any>} object The object to inspect.
 * @param {Record<PropertyKey, (value: any) => boolean>} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 */
export function conformsTo(
  object: Record<PropertyKey, any>,
  source: Record<PropertyKey, (value: any) => boolean>
): boolean {
  for (const key of Object.keys(source)) {
    const predicate = source[key];
    const value = object[key];
    if ((value === undefined && !(key in object)) || !predicate(value)) {
      return false;
    }
  }
  return true;
}
