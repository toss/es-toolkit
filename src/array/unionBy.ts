/**
 * Creates an array of unique values, in order, from all given arrays using a provided mapping function to determine equality.
 *
 * @template T - Type of elements in the input arrays.
 * @template U - Type of the values returned by the mapping function.
 * 
 * @param {T[]} arr1 - The first array.
 * @param {T[]} arr2 - The second array.
 * @param {function(item: T): U} mapper - The function to map array elements to comparison values.
 * @returns {T[]} A new array containing the union of unique elements from `arr1` and `arr2`, based on the values returned by the mapping function.
 * 
 * @example
 * // Custom mapping function for numbers (modulo comparison)
 * const moduloMapper = (x) => x % 3;
 * unionBy([1, 2, 3], [4, 5, 6], moduloMapper);
 * // Returns [1, 2, 3]
 * 
 * @example
 * // Custom mapping function for objects with an 'id' property
 * const idMapper = (obj) => obj.id;
 * unionBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
 * // Returns [{ id: 1 }, { id: 2 }, { id: 3 }]
 */
export function unionBy<T, U>(arr1: T[], arr2: T[], mapper: (item: T) => U): T[] {
  const map = new Map<U, T>();

  for (const item of [...arr1, ...arr2]) {
    const key = mapper(item);
    if (!map.has(key)) {
      map.set(key, item);
    }
  }

  return [...map.values()];
}
