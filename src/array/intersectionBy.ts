/**
 * Returns the intersection of two or more arrays based on a mapping function.
 *
 * This function takes two or more arrays and a mapping function. It returns a new array containing
 * the elements from the first array that, when mapped using the provided function, have matching
 * mapped elements in all other arrays. It effectively filters out any elements from the first array
 * that do not have corresponding mapped values in every other array.
 *
 * @template T - The type of elements in the first array.
 * @template U - The type of elements in the other arrays.
 * @param {readonly T[]} firstArr - The first array to compare.
 * @param {readonly U[]} secondArr - The second array to compare.
 * @param {...[...Array<readonly U[]>, (item: T | U) => unknown]} arrays - Additional arrays to compare and the mapper function as the last argument.
 * @returns {T[]} A new array containing the elements from the first array that have corresponding mapped values in all other arrays.
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }, { id: 4 }];
 * const mapper = item => item.id;
 * const result = intersectionBy(array1, array2, mapper);
 * // result will be [{ id: 2 }] since only this element has a matching id in both arrays.
 *
 * @example
 * const array1 = [
 *   { id: 1, name: 'jane' },
 *   { id: 2, name: 'amy' },
 *   { id: 3, name: 'michael' },
 * ];
 * const array2 = [2, 4];
 * const mapper = item => (typeof item === 'object' ? item.id : item);
 * const result = intersectionBy(array1, array2, mapper);
 * // result will be [{ id: 2, name: 'amy' }] since only this element has a matching id that is equal to the second array's element.
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }, { id: 3 }];
 * const array3 = [{ id: 2 }, { id: 4 }];
 * const mapper = item => item.id;
 * const result = intersectionBy(array1, array2, array3, mapper);
 * // result will be [{ id: 2 }, { id: 3 }] since only this element has a matching id in all three arrays.
 */
export function intersectionBy<T, U>(
  firstArr: readonly T[],
  secondArr: readonly U[],
  ...arrays: [...Array<readonly U[]>, (item: T | U) => unknown]
): T[] {
  const mapper = arrays[arrays.length - 1] as (item: T | U) => unknown;
  const otherArrays = [secondArr, ...arrays.slice(0, -1)] as Array<readonly U[]>;

  let result = Array.from(firstArr);

  for (let i = 0; i < otherArrays.length; ++i) {
    const arr = otherArrays[i];
    const mappedSet = new Set(arr.map(mapper));
    result = result.filter(item => mappedSet.has(mapper(item)));
  }

  return result;
}
