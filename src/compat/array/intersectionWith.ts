import { last } from './last.ts';
import { intersectionWith as intersectionWithToolkit } from '../../array/intersectionWith.ts';
import { uniq as uniqToolkit } from '../array/uniq.ts';
import { eq } from '../util/eq.ts';

/**
 * Returns the intersection of two arrays based on a custom equality function.
 *
 * This function takes two arrays and a custom equality function. It returns a new array containing
 * the elements from the first array that have matching elements in the second array, as determined
 * by the custom equality function. It effectively filters out any elements from the first array that
 * do not have corresponding matches in the second array according to the equality function.
 *
 * @template T - The type of elements in the first array.
 * @template U - The type of elements in the second array.
 * @param {T[]} firstArr - The first array to compare.
 * @param {U[]} secondArr - The second array to compare.
 * @param {(x: T, y: U) => boolean} areItemsEqual - A custom function to determine if two elements are equal.
 * This function takes two arguments, one from each array, and returns `true` if the elements are considered equal, and `false` otherwise.
 * @returns {T[]} A new array containing the elements from the first array that have corresponding matches in the second array according to the custom equality function.
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }, { id: 4 }];
 * const areItemsEqual = (a, b) => a.id === b.id;
 * const result = intersectionWith(array1, array2, areItemsEqual);
 * // result will be [{ id: 2 }] since this element has a matching id in both arrays.
 *
 * @example
 * const array1 = [
 *   { id: 1, name: 'jane' },
 *   { id: 2, name: 'amy' },
 *   { id: 3, name: 'michael' },
 * ];
 * const array2 = [2, 4];
 * const areItemsEqual = (a, b) => a.id === b;
 * const result = intersectionWith(array1, array2, areItemsEqual);
 * // result will be [{ id: 2, name: 'amy' }] since this element has a matching id that is equal to seconds array's element.
 */
export function intersectionWith<T, U>(
  firstArr: ArrayLike<T> | null | undefined,
  secondArr: ArrayLike<U> | null | undefined,
  areItemsEqual: (x: T, y: U) => boolean
): T[];
/**
 * Returns the intersection of three arrays based on a custom equality function.
 *
 * @template T - The type of elements in the first array
 * @template U - The type of elements in the second array
 * @template V - The type of elements in the third array
 * @param {ArrayLike<T> | null | undefined} firstArr - The first array to compare
 * @param {ArrayLike<U> | null | undefined} secondArr - The second array to compare
 * @param {ArrayLike<V> | null | undefined} thirdArr - The third array to compare
 * @param {(x: T, y: U | V) => boolean} areItemsEqual - Custom equality function
 * @returns {T[]} Elements from first array that match in all arrays
 *
 * @example
 * const arr1 = [{id: 1}, {id: 2}];
 * const arr2 = [{id: 2}, {id: 3}];
 * const arr3 = [{id: 2}, {id: 4}];
 * const result = intersectionWith(arr1, arr2, arr3, (a, b) => a.id === b.id);
 * // result is [{id: 2}]
 */
export function intersectionWith<T, U, V>(
  firstArr: ArrayLike<T> | null | undefined,
  secondArr: ArrayLike<U> | null | undefined,
  thirdArr: ArrayLike<V> | null | undefined,
  areItemsEqual: (x: T, y: U | V) => boolean
): T[];

/**
 * Returns the intersection of four arrays based on a custom equality function.
 *
 * @template T - The type of elements in the first array
 * @template U - The type of elements in the second array
 * @template V - The type of elements in the third array
 * @template W - The type of elements in the fourth array
 * @param {ArrayLike<T> | null | undefined} firstArr - The first array to compare
 * @param {ArrayLike<U> | null | undefined} secondArr - The second array to compare
 * @param {ArrayLike<V> | null | undefined} thirdArr - The third array to compare
 * @param {ArrayLike<V> | null | undefined} fourthArr - The fourth array to compare
 * @param {(x: T, y: U | V | W) => boolean} areItemsEqual - Custom equality function
 * @returns {T[]} Elements from first array that match in all arrays
 *
 * @example
 * const arr1 = [{id: 1}, {id: 2}];
 * const arr2 = [{id: 2}, {id: 3}];
 * const arr3 = [{id: 2}, {id: 4}];
 * const arr4 = [{id: 2}, {id: 5}];
 * const result = intersectionWith(arr1, arr2, arr3, arr4, (a, b) => a.id === b.id);
 * // result is [{id: 2}]
 */
export function intersectionWith<T, U, V, W>(
  firstArr: ArrayLike<T> | null | undefined,
  secondArr: ArrayLike<U> | null | undefined,
  thirdArr: ArrayLike<V> | null | undefined,
  fourthArr: ArrayLike<V> | null | undefined,
  areItemsEqual: (x: T, y: U | V | W) => boolean
): T[];

/**
 * Returns the intersection of multiple arrays based on a custom equality function.
 *
 * @template T - The type of elements in the arrays
 * @param {ArrayLike<T> | null | undefined} firstArr - The first array to compare
 * @param {...(ArrayLike<T> | null | undefined | ((x: T, y: T) => boolean))} otherArrs - Additional arrays and optional equality function
 * @returns {T[]} Elements from first array that match in all arrays
 *
 * @example
 * const arr1 = [{id: 1}, {id: 2}];
 * const arr2 = [{id: 2}, {id: 3}];
 * const arr3 = [{id: 2}, {id: 4}];
 * const result = intersectionWith(arr1, arr2, arr3, (a, b) => a.id === b.id);
 * // result is [{id: 2}]
 */
export function intersectionWith<T>(
  firstArr: ArrayLike<T> | null | undefined,
  ...otherArrs: Array<ArrayLike<T> | null | undefined | ((x: T, y: T) => boolean)>
): T[];

/**
 * Returns the intersection of multiple arrays based on a custom equality function.
 *
 * @template T - The type of elements in the arrays
 * @param {ArrayLike<T> | null | undefined} firstArr - The first array to compare
 * @param {...(ArrayLike<T> | null | undefined | ((x: T, y: T) => boolean))} otherArrs - Additional arrays and optional equality function
 * @returns {T[]} Elements from first array that match in all arrays
 *
 * @example
 * const arr1 = [{id: 1}, {id: 2}];
 * const arr2 = [{id: 2}, {id: 3}];
 * const result = intersectionWith(arr1, arr2, (a, b) => a.id === b.id);
 * // result is [{id: 2}]
 */
export function intersectionWith<T>(
  firstArr: ArrayLike<T> | null | undefined,
  ...otherArrs: Array<ArrayLike<T> | null | undefined | ((x: T, y: T) => boolean)>
): T[] {
  console.log(firstArr);

  if (firstArr == null) {
    return [];
  }

  const _comparator = last(otherArrs);
  let comparator = eq as (x: T, y: T) => boolean;
  let uniq: (arr: T[]) => T[] = uniqToolkit;

  if (typeof _comparator === 'function') {
    comparator = _comparator;
    uniq = uniqPreserve0;
    otherArrs.pop();
  }

  let result = uniq(Array.from(firstArr));

  for (let i = 0; i < otherArrs.length; ++i) {
    const otherArr = otherArrs[i] as ArrayLike<T>;

    if (otherArr == null) {
      return [];
    }

    result = intersectionWithToolkit(result, Array.from(otherArr), comparator);
  }

  return result;
}

/**
 * This function is to preserve the sign of `-0`, which is a behavior in lodash.
 */
function uniqPreserve0<T>(arr: T[]): T[] {
  const result = [];
  const added = new Set();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (added.has(item)) {
      continue;
    }

    result.push(item);
    added.add(item);
  }

  return result;
}
