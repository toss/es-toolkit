import { updateWith } from './updateWith.ts';

/**
 * Sets the value at the specified path of the given object using a customizer function.
 * If any part of the path does not exist, it will be created.
 * If `customizer` returns `undefined`, path creation is handled by the method instead.
 * The `customizer` is invoked with three arguments: (nsValue, key, nsObject).
 *
 * **Note:** This method mutates `object`.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to modify.
 * @param {PropertyKey | PropertyKey[]} path - The path of the property to set.
 * @param {unknown} value - The value to set.
 * @param {(value: unknown) => unknown} [customizer] - The function to customize path creation.
 * @returns {T} - The modified object.
 *
 * @example
 * // Set a value in a nested array with customizer
 * const obj = {};
 * setWith(obj, '[0][1]', 'a', Object);
 * console.log(obj); // { '0': { '1': 'a' } }
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
