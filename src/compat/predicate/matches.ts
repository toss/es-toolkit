import { isMatch } from './isMatch.ts';
import { cloneDeep } from '../object/cloneDeep.ts';

/**
 * Creates a function that performs a deep comparison between a given target and the source object.
 *
 * @template T
 * @param {T} source - The source object to create the matcher from.
 * @returns {(value: any) => boolean} Returns a function that takes a target object and returns `true` if the target matches the source, otherwise `false`.
 *
 * @example
 * const matcher = matches({ a: 1, b: 2 });
 * matcher({ a: 1, b: 2, c: 3 }); // true
 * matcher({ a: 1, c: 3 }); // false
 */
export function matches<T>(source: T): (value: any) => boolean;

/**
 * Creates a function that performs a deep comparison between a given target and the source object.
 *
 * @template T
 * @template V
 * @param {T} source - The source object to create the matcher from.
 * @returns {(value: V) => boolean} Returns a function that takes a target object and returns `true` if the target matches the source, otherwise `false`.
 *
 * @example
 * const matcher = matches<{ a: number }, { a: number; b?: number }>({ a: 1 });
 * matcher({ a: 1, b: 2 }); // true
 * matcher({ a: 2 }); // false
 */
export function matches<T, V>(source: T): (value: V) => boolean;

/**
 * Creates a function that performs a deep comparison between a given target and the source object.
 *
 * @template T
 * @template V
 * @param {T} source - The source object to create the matcher from.
 * @returns {(target: V) => boolean} Returns a function that takes a target object and returns `true` if the target matches the source, otherwise `false`.
 *
 * @example
 * // Basic usage
 * const matcher = matches({ a: 1, b: 2 });
 * matcher({ a: 1, b: 2, c: 3 }); // true
 * matcher({ a: 1, c: 3 }); // false
 *
 * @example
 * // Matching arrays
 * const arrayMatcher = matches([1, 2, 3]);
 * arrayMatcher([1, 2, 3, 4]); // true
 * arrayMatcher([4, 5, 6]); // false
 *
 * @example
 * // Matching objects with nested structures
 * const nestedMatcher = matches({ a: { b: 2 } });
 * nestedMatcher({ a: { b: 2, c: 3 } }); // true
 * nestedMatcher({ a: { c: 3 } }); // false
 */
export function matches<T, V>(source: T): (target: V) => boolean {
  source = cloneDeep(source);

  return (target?: unknown): boolean => {
    return isMatch(target as object, source as object);
  };
}
