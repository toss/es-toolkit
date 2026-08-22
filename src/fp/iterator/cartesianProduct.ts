import { cartesianProduct as cartesianProductIterator } from '../../iterator/cartesianProduct.ts';

/**
 * Creates a function that lazily takes the Cartesian product of the piped
 * iterator and `other`, for use with {@link pipe}. Every element of the piped
 * iterator is paired with every element of `other`, with `other` advancing
 * fastest. `other` is buffered into an array when iteration starts, while the
 * piped iterator is consumed lazily, so it may be infinite.
 *
 * @template T - The type of elements produced by the piped iterator.
 * @template U - The type of elements produced by `other`.
 * @param other - The iterator to take the product with.
 * @returns A function mapping an `Iterator<T>` to a lazy `IteratorObject<[T, U]>`.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { cartesianProduct, toArray } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2].values(), cartesianProduct(['a', 'b'].values()), toArray());
 * // => [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 */
export function cartesianProduct<T, U>(other: Iterator<U>): (source: Iterator<T>) => IteratorObject<[T, U], undefined> {
  return function cartesianProductInIterator(source: Iterator<T>): IteratorObject<[T, U], undefined> {
    return cartesianProductIterator(source, other);
  };
}
