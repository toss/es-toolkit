/**
 * Returns a new array containing the first `count` elements from the input array `arr`.
 * If `count` is greater than the length of `arr`, the entire array is returned.
 * If `count` is negative, `abs(count)` items are removed from the end of the array.
 *
 * @template T - Type of the input array.
 * @template C - Type of the number of elements to take.
 *
 *
 * @param {T} arr - The array to take elements from.
 * @param {C} count - The number of elements to take.
 * @returns {Take<T, C>} A new array containing the taken elements.
 *
 * @example
 * // Returns [1, 2, 3]
 * take([1, 2, 3, 4, 5], 3);
 *
 * @example
 * // Returns ['a', 'b']
 * take(['a', 'b', 'c'], 2);
 *
 * @example
 * // Returns [1, 2, 3]
 * take([1, 2, 3], 5);
 *
 * @example
 * // Returns [1, 2, 3]
 * take([1, 2, 3, 4, 5], -2);
 */
export function take<const T extends readonly any[], C extends number>(arr: T, count: C): Take<T, C> {
  return arr.slice(0, count) as Take<T, C>;
}

type Take<TArray extends readonly any[], TCount extends number> = TCount extends 0
  ? []
  : `${TCount}` extends `-${infer N extends number}`
    ? RemoveFromEnd<TArray, N>
    : TArray extends readonly any[]
      ? TakeFromStart<TArray, TCount>
      : [];

type RemoveFromEnd<
  TArray extends readonly any[],
  TCount extends number,
  Removed extends any[] = [],
> = TCount extends Removed['length']
  ? TArray
  : TArray extends readonly [...infer Rest, any]
    ? RemoveFromEnd<Rest, TCount, [...Removed, null]>
    : Array<TArray[number]>;

type TakeFromStart<
  TArray extends readonly any[],
  TCount extends number,
  Taken extends any[] = [],
> = TArray['length'] extends 0
  ? Taken
  : TCount extends Taken['length']
    ? Taken
    : TArray extends readonly [infer First, ...infer Rest]
      ? TakeFromStart<Rest, TCount, [...Taken, First]>
      : Array<TArray[number]>;
