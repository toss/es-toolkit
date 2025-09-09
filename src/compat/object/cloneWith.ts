import { clone } from './clone.ts';

type CloneWithCustomizer<T, R> = (value: T, key: number | string | undefined, object: any, stack: any) => R;

/**
 * Creates a shallow clone of a value with customizer that returns a specific result type.
 *
 * @template T - The type of the value to clone.
 * @template R - The result type extending primitive types or objects.
 * @param {T} value - The value to clone.
 * @param {CloneWithCustomizer<T, R>} customizer - The function to customize cloning.
 * @returns {R} Returns the cloned value.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * const cloned = cloneWith(obj, (value) => {
 *   if (typeof value === 'object') {
 *     return JSON.parse(JSON.stringify(value));
 *   }
 * });
 * // => { a: 1, b: 2 }
 */
export function cloneWith<T, R extends object | string | number | boolean | null>(
  value: T,
  customizer: CloneWithCustomizer<T, R>
): R;

/**
 * Creates a shallow clone of a value with optional customizer.
 *
 * @template T - The type of the value to clone.
 * @template R - The result type.
 * @param {T} value - The value to clone.
 * @param {CloneWithCustomizer<T, R | undefined>} customizer - The function to customize cloning.
 * @returns {R | T} Returns the cloned value or the customized result.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * const cloned = cloneWith(obj, (value) => {
 *   if (typeof value === 'number') {
 *     return value * 2;
 *   }
 * });
 * // => { a: 2, b: 4 }
 */
export function cloneWith<T, R>(value: T, customizer: CloneWithCustomizer<T, R | undefined>): R | T;

/**
 * Creates a shallow clone of a value.
 *
 * @template T - The type of the value to clone.
 * @param {T} value - The value to clone.
 * @returns {T} Returns the cloned value.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * const cloned = cloneWith(obj);
 * // => { a: 1, b: 2 }
 */
export function cloneWith<T>(value: T): T;

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
export function cloneWith(value: any, customizer?: any): any {
  if (!customizer) {
    return clone(value);
  }

  const result = customizer(value);
  if (result !== undefined) {
    return result;
  }

  return clone(value);
}
