import { property } from '../object/property';
import { isArray } from '../predicate/isArray';
import { matches } from '../predicate/matches';
import { matchesProperty } from '../predicate/matchesProperty';

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
        return value === undefined || isNaN(value) ? undefined : value;
      };
      break;
    case 'string':
    case 'symbol':
      getValue = (item: T) => {
        const value = property(iteratee)(item);
        return value === undefined || isNaN(value) ? undefined : value;
      };
      break;
    case 'object':
      if (isArray(iteratee)) {
        const predicate = matchesProperty(iteratee[0], iteratee[1]);
        getValue = (item: T) => (predicate(item) ? Infinity : -Infinity);
      } else {
        const predicate = matches(iteratee);
        getValue = (item: T) => (predicate(item) ? Infinity : -Infinity);
      }
      break;
    default:
      getValue = () => undefined;
  }

  let maxElement: T | undefined = undefined;
  let maxValue: number = -Infinity;

  for (let i = 0; i < items.length; i++) {
    const value = getValue(items[i]);
    if (value !== undefined && value > maxValue) {
      maxValue = value;
      maxElement = items[i];
    }
  }

  return maxElement;
}
