/**
 * Sets the value at the specified path of the given object. If any part of the path does not exist, it will be created.
 *
 * @template T - The type of the object.
 * @param {Settable} obj - The object to modify.
 * @param {Path} path - The path of the property to set.
 * @param {any} value - The value to set.
 * @returns {T} - The modified object.
 *
 * @example
 * // Set a value in a nested object
 * const obj = { a: { b: { c: 3 } } };
 * set(obj, 'a.b.c', 4);
 * console.log(obj.a.b.c); // 4
 *
 * @example
 * // Set a value in an array
 * const arr = [1, 2, 3];
 * set(arr, 1, 4);
 * console.log(arr[1]); // 4
 *
 * @example
 * // Create non-existent path and set value
 * const obj = {};
 * set(obj, 'a.b.c', 4);
 * console.log(obj); // { a: { b: { c: 4 } } }
 */
export function set<T>(obj: Settable, path: Path, value: any): T {
  if (obj instanceof Map || obj instanceof Set) {
    throw new TypeError('Set or Map is not supported');
  }
  //TODO: memoize
  const keys = Array.isArray(path)
    ? path
    : String(path as string)
        .replace(/\[|\]/g, match => {
          return match === '[' ? '.' : '';
        })
        .split('.');

  let pointer: any = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1];
    if (pointer[key] == null || typeof pointer[key] !== 'object') {
      pointer[key] = /^\d+$/.test(nextKey as string) ? [] : {};
    }
    pointer = pointer[key];
  }

  pointer[keys[keys.length - 1]] = value;
  return obj as T;
}

type Settable = object | any[];
type Path = string | number | Array<string | number>;
