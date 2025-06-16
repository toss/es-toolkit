/**
 * Check if native iterator helpers are available
 */
export function hasNativeIteratorHelpers(): boolean {
  // Check if the iterator prototype has the required methods
  const testIterator = [][Symbol.iterator]();
  return (
    typeof testIterator.map === 'function' &&
    typeof testIterator.filter === 'function' &&
    typeof testIterator.take === 'function' &&
    typeof testIterator.drop === 'function'
  );
}

/**
 * ECMAScript 2024 Iterator Helper Types
 */
export interface IteratorWithHelpers<T> extends Iterator<T> {
  map?<U>(mapper: (value: T) => U): IteratorWithHelpers<U>;
  filter?(predicate: (value: T) => boolean): IteratorWithHelpers<T>;
  take?(limit: number): IteratorWithHelpers<T>;
  drop?(limit: number): IteratorWithHelpers<T>;
  flatMap?<U>(mapper: (value: T) => IteratorWithHelpers<U>): IteratorWithHelpers<U>;
}

/**
 * Common type for objects that can be iterated
 */
export type Iterable<T> = globalThis.Iterable<T>;

/**
 * Type for inputs that can be either arrays or iterables
 */
export type IterableLike<T> = readonly T[] | Iterable<T>;

/**
 * Type guard to check if an object is an array
 */
export function isArray<T>(input: IterableLike<T>): input is readonly T[] {
  return Array.isArray(input);
}

/**
 * Gets the correct return type based on input type
 * - If input is an array, return an array
 * - If input is an iterable, return an iterable iterator
 */
export type IterationResult<T, U, I extends IterableLike<T>> = I extends readonly T[] ? U[] : IterableIterator<U>;
