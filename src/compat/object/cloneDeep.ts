import { cloneDeep as cloneDeepToolkit, copyProperties } from '../../object/cloneDeep.ts';
import { argumentsTag, booleanTag, numberTag, stringTag } from '../_internal/tags.ts';

/**
 * Creates a deep clone of the given object.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to clone.
 * @returns {T} - A deep clone of the given object.
 *
 * @example
 * // Clone a primitive values
 * const num = 29;
 * const clonedNum = clone(num);
 * console.log(clonedNum); // 29
 * console.log(clonedNum === num) ; // true
 *
 * @example
 * // Clone an array
 * const arr = [1, 2, 3];
 * const clonedArr = clone(arr);
 * console.log(clonedArr); // [1, 2, 3]
 * console.log(clonedArr === arr); // false
 *
 * @example
 * // Clone an array with nested objects
 * const arr = [1, { a: 1 }, [1, 2, 3]];
 * const clonedArr = clone(arr);
 * arr[1].a = 2;
 * console.log(arr); // [2, { a: 2 }, [1, 2, 3]]
 * console.log(clonedArr); // [1, { a: 1 }, [1, 2, 3]]
 * console.log(clonedArr === arr); // false
 *
 * @example
 * // Clone an object
 * const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
 * const clonedObj = clone(obj);
 * console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
 * console.log(clonedObj === obj); // false
 *
 * @example
 * // Clone an object with nested objects
 * const obj = { a: 1, b: { c: 1 } };
 * const clonedObj = clone(obj);
 * obj.b.c = 2;
 * console.log(obj); // { a: 1, b: { c: 2 } }
 * console.log(clonedObj); // { a: 1, b: { c: 1 } }
 * console.log(clonedObj === obj); // false
 */
export function cloneDeep<T>(obj: T): T {
  if (typeof obj !== 'object') {
    return cloneDeepToolkit(obj);
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
      return cloneDeepToolkit(obj);
    }
  }
}