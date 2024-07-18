/**
 * Creates a deeply nested object given arrays of paths and values.
 *
 * This function takes two arrays: one containing arrays of property paths, and the other containing corresponding values.
 * It returns a new object where paths from the first array are used as key paths to set values, with corresponding elements from the second array as values.
 * Paths can be dot-separated strings or arrays of property names.
 * 
 * If the `keys` array is longer than the `values` array, the remaining keys will have `undefined` as their values.
 *
 * @template V - The type of elements in the array.
 * @param {string[] | string[][]} keys - An array of property paths, each path can be a dot-separated string or an array of property names.
 * @param {V[]} values - An array of values corresponding to the property paths.
 * @returns {object} A new object composed of the given property paths and values.
 *
 * @example
 * const paths = ['a.b.c', 'd.e.f'];
 * const values = [1, 2];
 * const result = zipObjectDeep(paths, values);
 * // result will be { a: { b: { c: 1 } }, d: { e: { f: 2 } } }
 *
 * @example
 * const paths = [['a', 'b', 'c'], ['d', 'e', 'f']];
 * const values = [1, 2];
 * const result = zipObjectDeep(paths, values);
 * // result will be { a: { b: { c: 1 } }, d: { e: { f: 2 } } }
 * 
 * @example
 * const paths = ['a.b[0].c', 'a.b[1].d'];
 * const values = [1, 2];
 * const result = zipObjectDeep(paths, values);
 * // result will be { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
 */
export function zipObjectDeep<P extends string | number | symbol, V>(keys: P[], values: V[]): { [K in P]: V } {
  const result = {} as { [K in P]: V }

  for (let pathIndex = 0; pathIndex < keys.length; pathIndex++) {
    const path = keys[pathIndex]
    if (typeof path === 'string') {
      const pathArray = path.split('.')

      pathArray.reduce((acc, key, index) => {
        if (key.includes('[')) {
          const [k, v] = key.split('[')
          const value = v.replace(']', '')
          if (!acc[k]) {
            acc[k] = []
          }
          if (index === pathArray.length - 1) {
            acc[k][value] = values[pathIndex]
          }
          return acc[k]
        }

        if (Array.isArray(acc)) {
          const parentKey = path.match(/\[(\d+)\]/)
          if (parentKey === null) {
            throw new Error('Invalid path')
          }
          const arrIndex = parseInt(String(parentKey[1]))

          if (!acc[arrIndex]) {
            acc[arrIndex] = {}
          }
          if (index === pathArray.length - 1) {
            acc[arrIndex][key] = values[pathIndex]
          }
        } else {
          if (!acc[key]) {
            acc[key] = {}
          }
          if (index === pathArray.length - 1) {
            acc[key] = values[pathIndex]
          }
        }

        return acc[key]
      }, result as any)
    } else {
      // path is number not NaN, Infinity, etc.
      if (typeof path === 'number' && Number.isInteger(path)) {
        result[path] = values[pathIndex]
      }
      // path is Symbol
      if (typeof path === 'symbol') {
        result[path] = values[pathIndex]
      }
    }
  }

  return result
}
