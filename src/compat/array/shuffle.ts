import { shuffle as shuffleToolkit } from '../../array/shuffle.ts';
import { values } from '../object/values.ts';
import { isArray } from '../predicate/isArray.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isNil } from '../predicate/isNil.ts';
import { isObjectLike } from '../predicate/isObjectLike.ts';

/**
 * Randomizes the order of elements in an `array` using the Fisher-Yates algorithm.
 *
 * This function takes an `array` and returns a new `array` with its elements shuffled in a random order.
 *
 * @template T - The type of elements in the `array`.
 * @param {T[]} array - The `array` to shuffle.
 * @returns {T[]} A new `array` with its elements shuffled in random order.
 */
export function shuffle<T>(array: ArrayLike<T> | null | undefined): T[];

/**
 * Randomizes the order of elements in an `object` using the Fisher-Yates algorithm.
 *
 * This function takes an `object` and returns a new `object` with its values shuffled in a random order.
 *
 * @template T - The type of elements in the `object`.
 * @param {T} object - The `object` to shuffle.
 * @returns {T[]} A new `Array` with the values of the `object` shuffled in a random order.
 */
export function shuffle<T extends object>(object: T | null | undefined): Array<T[keyof T]>;

/**
 * Randomizes the order of elements in an `collection` using the Fisher-Yates algorithm.
 *
 * This function takes an `collection` and returns a new `collection` with its elements shuffled in a random order.
 *
 * @template T - The type of elements in the `collection`.
 * @param {T[]} collection - The `collection` to shuffle.
 * @returns {T[]} A new `collection` with its elements shuffled in random order.
 */
export function shuffle<T>(collection: ArrayLike<T> | T | null | undefined): T[] | Array<T[keyof T]> {
  if (isNil(collection)) {
    return [];
  }

  if (isArray(collection)) {
    return shuffleToolkit(collection);
  }

  if (isArrayLike(collection)) {
    return shuffleToolkit(Array.from(collection));
  }

  if (isObjectLike(collection)) {
    return shuffleToolkit(values(collection));
  }

  return [];
}
