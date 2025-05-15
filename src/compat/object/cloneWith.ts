import { clone } from './clone.ts';

/**
 * Creates a shallow clone of the given object with customization.
 * This method is like `_.clone` except that it accepts a customizer which
 * is invoked to produce the cloned value. If customizer returns undefined,
 * cloning is handled by the method instead.
 *
 * If no customizer is provided, it behaves like `clone`.
 *
 * @template T - The type of the object.
 * @param {T} value - The value to clone.
 * @param {Function} [customizer] - The function to customize cloning.
 * @returns {T} - A shallow clone of the given object.
 *
 * @example
 * // Clone a primitive values
 * const num = 29;
 * const clonedNum = cloneWith(num);
 * console.log(clonedNum); // 29
 * console.log(clonedNum === num) ; // true
 *
 * @example
 * // Clone an array
 * const arr = [1, 2, 3];
 * const clonedArr = cloneWith(arr);
 * console.log(clonedArr); // [1, 2, 3]
 * console.log(clonedArr === arr); // false
 *
 * @example
 * // Clone an object
 * const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
 * const clonedObj = cloneWith(obj);
 * console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
 * console.log(clonedObj === obj); // false
 *
 * @example
 * // Clone an object with a customizer
 * const obj = { a: 1, b: 2 };
 * const clonedObj = cloneWith(obj, (value) => {
 *   if (typeof value === 'number') {
 *     return value * 2; // Double the number
 *   }
 *   // Returning undefined uses the default cloning
 * });
 * console.log(clonedObj); // { a: 2, b: 4 }
 */
export function cloneWith<T>(value: T, customizer?: (value: any) => any): T {
  if (!customizer) {
    return clone(value);
  }

  const result = customizer(value);
  if (result !== undefined) {
    return result;
  }

  return clone(value);
}
