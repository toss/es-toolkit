import { cloneDeepWith as cloneDeepWithToolkit } from '../../object/cloneDeepWith.ts';
import { copyProperties } from '../../object/cloneDeepWith.ts';
import { argumentsTag, booleanTag, numberTag, stringTag } from '../_internal/tags.ts';

type CloneDeepWithCustomizer<TObject> = (
  value: any,
  key: number | string | undefined,
  object: TObject | undefined,
  stack: any
) => any;

/**
 * Creates a deep clone of the given value using a customizer function.
 *
 * @template T - The type of the value.
 * @param {T} value - The value to clone.
 * @param {CloneDeepWithCustomizer<T>} customizer - A function to customize the cloning process.
 * @returns {any} - A deep clone of the given value.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * const clonedObj = cloneDeepWith(obj, (value) => {
 *   if (typeof value === 'number') {
 *     return value * 2;
 *   }
 * });
 * // => { a: 2, b: 4 }
 */
export function cloneDeepWith<T>(value: T, customizer: CloneDeepWithCustomizer<T>): any;

/**
 * Creates a deep clone of the given value.
 *
 * @template T - The type of the value.
 * @param {T} value - The value to clone.
 * @returns {T} - A deep clone of the given value.
 *
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const clonedObj = cloneDeepWith(obj);
 * // => { a: 1, b: { c: 2 } }
 */
export function cloneDeepWith<T>(value: T): T;

/**
 * Creates a deep clone of the given object using a customizer function.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to clone.
 * @param {Function} [cloneValue] - A function to customize the cloning process.
 * @returns {T} - A deep clone of the given object.
 *
 * @example
 * // Clone a primitive value
 * const num = 29;
 * const clonedNum = cloneDeepWith(num);
 * console.log(clonedNum); // 29
 * console.log(clonedNum === num); // true
 *
 * @example
 * // Clone an object with a customizer
 * const obj = { a: 1, b: 2 };
 * const clonedObj = cloneDeepWith(obj, (value) => {
 *   if (typeof value === 'number') {
 *     return value * 2; // Double the number
 *   }
 * });
 * console.log(clonedObj); // { a: 2, b: 4 }
 * console.log(clonedObj === obj); // false
 *
 * @example
 * // Clone an array with a customizer
 * const arr = [1, 2, 3];
 * const clonedArr = cloneDeepWith(arr, (value) => {
 *   return value + 1; // Increment each value
 * });
 * console.log(clonedArr); // [2, 3, 4]
 * console.log(clonedArr === arr); // false
 */
export function cloneDeepWith<T>(obj: T, customizer?: CloneDeepWithCustomizer<T>): any | T {
  return cloneDeepWithToolkit(obj, (value, key, object, stack) => {
    const cloned = customizer?.(value, key as any, object, stack);

    if (cloned != null) {
      return cloned;
    }

    if (typeof obj !== 'object') {
      return undefined;
    }

    switch (Object.prototype.toString.call(obj)) {
      case numberTag:
      case stringTag:
      case booleanTag: {
        // eslint-disable-next-line
        // @ts-ignore
        const result = new obj.constructor(obj?.valueOf()) as T;
        copyProperties(result, obj);
        return result;
      }

      case argumentsTag: {
        const result = {} as any;

        copyProperties(result, obj);

        // eslint-disable-next-line
        // @ts-ignore
        result.length = obj.length;
        // eslint-disable-next-line
        // @ts-ignore
        result[Symbol.iterator] = obj[Symbol.iterator];

        return result as T;
      }

      default: {
        return undefined;
      }
    }
  });
}
