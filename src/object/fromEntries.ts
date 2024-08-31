/**
 * Transforms an array of key-value pairs into an object.
 *
 * @param {Array} data - An array of key-value pairs. 
 * @returns {Record<T, U>} - An object with keys and values from the input array.
 *
 * @example  
 * const entries = [['a', 1], ['b', 2]];  
 *  
 * const object = fromEntries(entries);  
 * console.log(object);  
 * // Output:  
 * // {  
 * //   a: 1,  
 * //   b: 2  
 * // }  
 */

export function fromEntries<T extends string | number | symbol, U>(data: (string | number|symbol)[][] | Map<T, U>): { [key in T]: U } {
  const obj = {} as { [key in T]: U };
  for (const [key, value] of data) {
    obj[key as T] = value as U;
  }
  return obj;
}
