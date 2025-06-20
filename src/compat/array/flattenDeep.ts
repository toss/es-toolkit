import { flatten } from './flatten.ts';

/**
 * Utility type for recursively unpacking nested array types to extract the type of the innermost element
 *
 * @example
 * ExtractNestedArrayType<(number | (number | number[])[])[]>
 * // number
 *
 * ExtractNestedArrayType<(boolean | (string | number[])[])[]>
 * // string | number | boolean
 */
type ExtractNestedArrayType<T> = T extends ReadonlyArray<infer U> ? ExtractNestedArrayType<U> : T;

/**
 * Recursively flattens array.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to flatten.
 * @returns {Array<ExtractNestedArrayType<T>>} Returns the new flattened array.
 *
 * @example
 * flattenDeep([1, [2, [3, [4]], 5]]);
 * // => [1, 2, 3, 4, 5]
 */
export function flattenDeep<T>(array: ArrayLike<T> | null | undefined): Array<ExtractNestedArrayType<T>>;

/**
 * Recursively flattens array.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to flatten.
 * @returns {Array<ExtractNestedArrayType<T>>} Returns the new flattened array.
 *
 * @example
 * flattenDeep([1, [2, [3, [4]], 5]]);
 * // => [1, 2, 3, 4, 5]
 */
export function flattenDeep<T>(value: ArrayLike<T> | null | undefined): Array<ExtractNestedArrayType<T>> {
  return flatten(value, Infinity) as Array<ExtractNestedArrayType<T>>;
}
