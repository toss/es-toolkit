/**
 * Checks if all elements in a collection pass the predicate.
 *
 * Returns `true` if all elements in an array, object, or string satisfy the predicate,
 * or if the collection is `null` or `undefined`.
 *
 * Note: Empty arrays `[]`, empty strings `''`, and empty objects `{}` return `true` by default.
 *
 * @template T The type of elements in the collection.
 * @param {T[] | { [key: string]: T } | string | null | undefined} collection - The collection to check.
 * @param {(value: T, indexOrKey: number | string) => boolean} predicate - The function to test each element.
 * @returns {boolean} `true` if all elements pass the predicate, `false` otherwise.
 *
 * @example
 * every([1, 2, 3], (value) => value > 0); // true
 * @example
 * every('abc', (char) => /[a-z]/.test(char)); // true
 * @example
 * every({ a: 1, b: 2 }, (value) => value > 0); // true
 */

export function every<T>(collection: T[] | null | undefined, predicate: (value: T, index: number) => boolean): boolean;
export function every<T>(
  collection: { [key: string]: T } | null | undefined,
  predicate: (value: T, key: string) => boolean
): boolean;
export function every(
  collection: string | null | undefined,
  predicate: (value: string, index: number) => boolean
): boolean;

export function every<T>(
  collection: T[] | { [key: string]: T } | string | null | undefined,
  predicate: (value: any, index: any) => boolean
): boolean {
  if (collection == null) {
    return true;
  }

  if (Array.isArray(collection)) {
    if (collection.length === 0) {
      return true;
    }
    for (let i = 0; i < collection.length; i++) {
      if (!predicate(collection[i], i)) {
        return false;
      }
    }
    return true;
  }

  if (typeof collection === 'string') {
    if (collection.length === 0) {
      return true;
    }
    for (let i = 0; i < collection.length; i++) {
      if (!predicate(collection[i], i)) {
        return false;
      }
    }
    return true;
  }

  const keys = Object.keys(collection);
  if (keys.length === 0) {
    return true;
  }
  for (const key of keys) {
    if (!predicate(collection[key], key)) {
      return false;
    }
  }

  return true;
}
