import { last } from './last';

type DistArray<T> = T extends any ? T[] : never;
type NonDistArray<T> = [T] extends [any] ? T[] : never;

/**
 * Groups the consecutive elements (like discriminated unions, but not limit only discriminated unions)
 * of an array based on a provided key-generating function.
 *
 * This function takes an array and a function that generates a key from each element. It returns
 * a array where the keys are the generated keys and the values are arrays of elements that share
 * the same key.
 *
 * @template T - The type of elements in the array.
 * @template K - The type of keys.
 * @param {T[]} arr - The array to group.
 * @param {(item: T) => K} getKeyFromItem - A function that generates a key from an element.
 * @returns {T[][]} An object where each key is associated with an array of elements that
 * share that key.
 *
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' }
 *   { category: 'vegetable', name: 'tomato' }
 *   { category: 'fruit', name: 'orange' }
 * ];
 * const result = groupConsecutiveBy(array, item => item.category);
 * // result will be:
 * // [
 * //   [
 * //     { category: 'fruit', name: 'apple' },
 * //     { category: 'fruit', name: 'banana' }
 * //   ],
 * //   [
 * //     { category: 'vegetable', name: 'carrot' }
 * //     { category: 'vegetable', name: 'tomato' }
 * //   ],
 * //   [
 * //     { category: 'fruit', name: 'orange' }
 * //   ]
 * // ]
 */
export const groupConsecutiveBy = <T, K extends PropertyKey>(
  arr: NonDistArray<T>,
  getKeyFromItem: (item: T) => K
): Array<DistArray<T>> => {
  const result = [] as Array<DistArray<T>>;

  for (const item of arr) {
    const key = getKeyFromItem(item);
    const lastGroup = last(result);
    const lastItem = last(lastGroup ?? []);
    const lastKey = lastItem ? getKeyFromItem(lastItem) : undefined;
    const newGroup = lastKey && key !== lastKey;

    if (result.length === 0 || newGroup) {
      result.push([item] as DistArray<T>);
    } else {
      result[result.length - 1].push(item);
    }
  }

  return result;
};
