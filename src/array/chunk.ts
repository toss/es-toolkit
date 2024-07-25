/**
 * Splits an array into smaller arrays of a specified length.
 *
 * This function takes an input array and divides it into multiple smaller arrays,
 * each of a specified length. If the input array cannot be evenly divided,
 * the final sub-array will contain the remaining elements.
 *
 * @template T - The type of the input array.
 * @template N - The type of the size of each sub-array.
 * @param {T} arr - The array to be chunked into smaller arrays.
 * @param {N} size - The size of each smaller array. Must be a positive integer.
 * @returns {Chunk<T, N>} A two-dimensional array where each sub-array has a maximum length of `size`.
 * @throws {Error} Throws an error if `size` is not a positive integer.
 *
 * @example
 * // Splits an array of numbers into sub-arrays of length 2
 * chunk([1, 2, 3, 4, 5], 2);
 * // Returns: [[1, 2], [3, 4], [5]]
 *
 * @example
 * // Splits an array of strings into sub-arrays of length 3
 * chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
 * // Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
 */
export function chunk<const T extends readonly any[], N extends number>(arr: T, size: N): Chunk<T, N> {
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error('Size must be an integer greater than zero.');
  }

  const chunkLength = Math.ceil(arr.length / size);
  const result = Array(chunkLength);

  for (let index = 0; index < chunkLength; index++) {
    const start = index * size;
    const end = start + size;

    result[index] = arr.slice(start, end);
  }

  return result as Chunk<T, N>;
}

type PositiveInteger<T extends number> = `${T}` extends `${bigint}`
  ? `${T}` extends `-${any}` | `0`
    ? false
    : true
  : false;

type Chunk<T extends readonly unknown[], D extends number = 1, A extends unknown[] = []> = any[] extends T
  ? T[]
  : number extends D
    ? any[]
    : PositiveInteger<D> extends true
      ? T extends readonly [infer F, ...infer R]
        ? A['length'] extends D
          ? [A, ...Chunk<R, D, [F]>]
          : Chunk<R, D, [...A, F]>
        : A extends []
          ? []
          : [A]
      : never;
