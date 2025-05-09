import { updateWith } from './updateWith.ts';

/**
 * Sets the value at the specified path of the given object using a customizer function.
 * If any part of the path does not exist, it will be created based on the customizer's result.
 *
 * The customizer is invoked to produce the objects of the path. If the customizer returns
 * a value, that value is used for the current path segment. If the customizer returns
 * `undefined`, the method will create an appropriate object based on the path - an array
 * if the next path segment is a valid array index, or an object otherwise.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to modify.
 * @param {PropertyKey | readonly PropertyKey[]} path - The path of the property to set.
 * @param {unknown} value - The value to set.
 * @param {(value: unknown) => unknown} [customizer] - The function to customize assigned values.
 * @returns {T} - The modified object.
 *
 * @example
 * // Set a value with a customizer that creates arrays for numeric path segments
 * const object = {};
 * setWith(object, '[0][1]', 'a', (value) => Array.isArray(value) ? value : []);
 * // => { '0': ['a'] }
 */
export function setWith<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  value: unknown,
  customizer?: (value: unknown) => unknown
): T {
  let customizerFn: (value: unknown) => unknown;

  if (typeof customizer === 'function') {
    customizerFn = customizer;
  } else {
    customizerFn = () => undefined;
  }

  return updateWith(obj, path, () => value, customizerFn);
}
