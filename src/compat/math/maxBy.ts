import { property } from '../object/property';
import { isArray } from '../predicate/isArray';

/**
 * Finds the element in an array that has the maximum value when applying
 * the `iteratee` to each element.
 *
 * @template T - The type of elements in the array.
 * @param {[T, ...T[]]} items The nonempty array of elements to search.
 * @param {((element: T) => number) | keyof T | [keyof T, unknown] | Partial<T>} iteratee
 * The criteria used to determine the maximum value.
 *  - If a **function** is provided, it extracts a numeric value from each element.
 *  - If a **string** is provided, it is treated as a key to extract values from the objects.
 *  - If a **[key, value]** pair is provided, it matches elements with the specified key-value pair.
 *  - If an **object** is provided, it matches elements that contain the specified properties.
 * @returns {T} The element with the maximum value as determined by the `iteratee`.
 * @example
 * maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 3 }
 * maxBy([], x => x.a); // Returns: undefined
 * maxBy(
 *   [
 *     { name: 'john', age: 30 },
 *     { name: 'jane', age: 28 },
 *     { name: 'joe', age: 26 },
 *   ],
 *   x => x.age
 * ); // Returns: { name: 'john', age: 30 }
 * maxBy([{ a: 1 }, { a: 2 }], 'a'); // Returns: { a: 2 }
 * maxBy([{ a: 1 }, { a: 2 }], ['a', 1]); // Returns: { a: 1 }
 * maxBy([{ a: 1 }, { a: 2 }], { a: 1 }); // Returns: { a: 1 }
 */
export function maxBy<T>(
  items: readonly [T, ...T[]],
  iteratee: ((element: T) => number) | keyof T | [keyof T, unknown] | Partial<T>
): T;
/**
 * Finds the element in an array that has the maximum value when applying
 * the `iteratee` to each element.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} items The array of elements to search.
 * @param {((element: T) => number) | keyof T | [keyof T, unknown] | Partial<T>} iteratee
 * The criteria used to determine the maximum value.
 *  - If a **function** is provided, it extracts a numeric value from each element.
 *  - If a **string** is provided, it is treated as a key to extract values from the objects.
 *  - If a **[key, value]** pair is provided, it matches elements with the specified key-value pair.
 *  - If an **object** is provided, it matches elements that contain the specified properties.
 * @returns {T | undefined} The element with the maximum value as determined by the `iteratee`.
 * @example
 * maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 3 }
 * maxBy([], x => x.a); // Returns: undefined
 * maxBy(
 *   [
 *     { name: 'john', age: 30 },
 *     { name: 'jane', age: 28 },
 *     { name: 'joe', age: 26 },
 *   ],
 *   x => x.age
 * ); // Returns: { name: 'john', age: 30 }
 * maxBy([{ a: 1 }, { a: 2 }], 'a'); // Returns: { a: 2 }
 * maxBy([{ a: 1 }, { a: 2 }], ['a', 1]); // Returns: { a: 1 }
 * maxBy([{ a: 1 }, { a: 2 }], { a: 1 }); // Returns: { a: 1 }
 */
export function maxBy<T>(
  items: readonly T[],
  iteratee: ((element: T) => number) | keyof T | [keyof T, unknown] | Partial<T>
): T | undefined;
/**
 * Finds the element in an array that has the maximum value when applying
 * the `iteratee` to each element.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} items The array of elements to search.
 * @param {((element: T) => number) | keyof T | [keyof T, unknown] | Partial<T>} iteratee
 * The criteria used to determine the maximum value.
 *  - If a **function** is provided, it extracts a numeric value from each element.
 *  - If a **string** is provided, it is treated as a key to extract values from the objects.
 *  - If a **[key, value]** pair is provided, it matches elements with the specified key-value pair.
 *  - If an **object** is provided, it matches elements that contain the specified properties.
 * @returns {T | undefined} The element with the maximum value as determined by the `iteratee`.
 * @example
 * maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 3 }
 * maxBy([], x => x.a); // Returns: undefined
 * maxBy(
 *   [
 *     { name: 'john', age: 30 },
 *     { name: 'jane', age: 28 },
 *     { name: 'joe', age: 26 },
 *   ],
 *   x => x.age
 * ); // Returns: { name: 'john', age: 30 }
 * maxBy([{ a: 1 }, { a: 2 }], 'a'); // Returns: { a: 2 }
 * maxBy([{ a: 1 }, { a: 2 }], ['a', 1]); // Returns: { a: 1 }
 * maxBy([{ a: 1 }, { a: 2 }], { a: 1 }); // Returns: { a: 1 }
 */
export function maxBy<T>(
  items: readonly T[],
  iteratee: ((element: T) => number) | keyof T | [keyof T, unknown] | Partial<T>
): T | undefined {
  if (!items.length) {
    return undefined;
  }

  let getValue: (element: T) => number | undefined;

  switch (typeof iteratee) {
    case 'function':
      getValue = (item: T) => {
        const value = iteratee(item);
        return typeof value === 'number' ? value : undefined;
      };
      break;
    case 'number':
      getValue = (item: T) => {
        if (Array.isArray(item)) {
          const value = item[iteratee];
          return typeof value === 'number' ? value : undefined;
        }
        return undefined;
      };
      break;
    case 'string':
    case 'symbol':
      getValue = (item: T) => {
        const value = property(iteratee as keyof T)(item);
        return typeof value === 'number' ? value : undefined;
      };
      break;
    case 'object':
      if (isArray(iteratee)) {
        getValue = (item: T) => {
          const value = property(iteratee[0] as keyof T)(item);
          return typeof value === 'number' ? value : undefined;
        };
      } else {
        getValue = (item: T) => {
          const key = Object.keys(iteratee)[0] as keyof T;
          const value = property(key)(item);
          return typeof value === 'number' ? value : undefined;
        };
      }
      break;
    default:
      getValue = () => undefined;
  }

  let maxElement: T | undefined = undefined;
  let maxValue: number | undefined = undefined;

  for (let i = 0; i < items.length; i++) {
    const value = getValue(items[i]);
    if (value !== undefined && !Number.isNaN(value) && (maxValue === undefined || value > maxValue)) {
      maxValue = value;
      maxElement = items[i];
    }
  }

  return maxElement;
}
