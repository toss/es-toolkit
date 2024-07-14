/**
 * Type that returns true if it is a tuple type with a fixed length.
 */
type IsTuple<T extends any[] | { length: number }> = [T] extends [never]
  ? false
  : T extends any[]
    ? number extends T['length']
      ? false
      : true
    : false;

/**
 * Type to infer the element type of an array or tuple
 */
type ElementOf<T extends readonly any[] | any[]> = T extends Array<infer E> ? E : never;

/**
 * Type to infer the value of array
 */
type ValueOf<T extends any[]> = T[number];

/**
 * {@link difference}'s return type
 */
type Difference<F extends any[], S extends any[]> =
  IsTuple<F> extends true
    ? IsTuple<S> extends true
      ? F extends [infer FE, ...infer Rest]
        ? FE extends ValueOf<S>
          ? Difference<Rest, S>
          : [FE, ...Difference<Rest, S>]
        : []
      : Array<ElementOf<F>>
    : Array<ElementOf<F>>;

/**
 * Computes the difference between two arrays.
 *
 * This function takes two arrays and returns a new array containing the elements
 * that are present in the first array but not in the second array. It effectively
 * filters out any elements from the first array that also appear in the second array.
 *
 * @template T
 * @param {T[]} firstArr - The array from which to derive the difference. This is the primary array
 * from which elements will be compared and filtered.
 * @param {T[]} secondArr - The array containing elements to be excluded from the first array.
 * Each element in this array will be checked against the first array, and if a match is found,
 * that element will be excluded from the result.
 * @returns {T[]} A new array containing the elements that are present in the first array but not
 * in the second array.
 *
 * @example
 * const array1 = [1, 2, 3, 4, 5];
 * const array2 = [2, 4];
 * const result = difference(array1, array2);
 * // result will be [1, 3, 5] since 2 and 4 are in both arrays and are excluded from the result.
 */
export function difference<F extends any[], S extends any[]>(firstArr: F, secondArr: S): Difference<F, S> {
  const secondSet = new Set(secondArr);

  return firstArr.filter(item => !secondSet.has(item)) as Difference<F, S>;
}
