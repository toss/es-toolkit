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
export type ExtractNestedArrayType<T> = T extends ReadonlyArray<infer U> ? ExtractNestedArrayType<U> : T;

/**
 * Flattens all depths of a nested array.
 *
 * @template T - The type of elements within the array.
 * @param {T[]} arr - The array to flatten.
 * @returns {Array<ExtractNestedArrayType<T>>} A new array that has been flattened.
 *
 * @example
 * const arr = flattenDeep([1, [2, [3]], [4, [5, 6]]]);
 * // Returns: [1, 2, 3, 4, 5, 6]
 */
export function flattenDeep<T>(arr: readonly T[]): Array<ExtractNestedArrayType<T>> {
  return flatten(arr, Infinity) as Array<ExtractNestedArrayType<T>>;
}
