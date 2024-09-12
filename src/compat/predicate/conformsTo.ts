/**
 * Checks if `object` conforms to `source` by invoking the predicate properties of `source` with the corresponding property values of `object`.
 *
 * Note: This method is equivalent to `conforms` when source is partially applied.
 *
 * @param {Record<PropertyKey, any>} target The object to inspect.
 * @param {Record<PropertyKey, (value: any) => boolean>} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 *
 * @example
 *
 * const object = { 'a': 1, 'b': 2 };
 * const source = {
 *   'a': (n) => n > 0,
 *   'b': (n) => n > 1
 * };
 *
 * console.log(conformsTo(object, source)); // => true
 *
 * const source2 = {
 *   'a': (n) => n > 1,
 *   'b': (n) => n > 1
 * };
 *
 * console.log(conformsTo(object, source2)); // => false
 */
export function conformsTo(
  target: Record<PropertyKey, any>,
  source: Record<PropertyKey, (value: any) => boolean>
): boolean {
  if (source == null) {
    return true;
  }

  if (target == null) {
    return Object.keys(source).length === 0;
  }

  for (const key of Object.keys(source)) {
    const predicate = source[key];
    const value = target[key];
    if ((value === undefined && !(key in target)) || !predicate(value)) {
      return false;
    }
  }
  return true;
}
