/**
 * Creates an array that excludes all specified values.
 *
 * It correctly excludes `NaN`, as it compares values using [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero).
 *
 * @template T The type of elements in the array.
 * @template V The type of values to exclude.
 * @param {T[]} array - The array to filter.
 * @param {...V[]} values - The values to exclude.
 * @returns {Without<T, V>} A new array without the specified values.
 *
 * @example
 * // Removes the specified values from the array
 * without([1, 2, 3, 4, 5], 2, 4);
 * // Returns: [1, 3, 5]
 *
 * @example
 * // Removes specified string values from the array
 * without(['a', 'b', 'c', 'a'], 'a');
 * // Returns: ['b', 'c']
 */
export function without<const T extends any[], const V extends T[number]>(array: T, ...values: V[]): Without<T, V> {
  const valuesSet = new Set(values);
  return array.filter(item => !valuesSet.has(item as never)) as never;
}

type Without<Items extends any[], Exclude extends Items[number], Out extends any[] = []> = Items extends []
  ? Out
  : IsAny<Exclude> extends true
    ? Items
    : IsNever<Exclude> extends true
      ? Items
      : Items extends [infer First, ...infer Rest]
        ? First extends Exclude
          ? Without<Rest, Exclude, Out>
          : Without<Rest, Exclude, [...Out, First]>
        : Array<Items[number]>;

/**
 * @see https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
 */
type IsAny<T> = 0 extends 1 & T ? true : false;

type IsNever<T> = [T] extends [never] ? true : false;
