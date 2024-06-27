import { random } from './random';

/**
 * Generates a random integer between minimum (inclusive) and maximum (exclusive).
 *
 * @param {number} minimum - The lower bound (inclusive).
 * @param {number} maximum - The upper bound (exclusive).
 * @returns {number} A random integer between minimum (inclusive) and maximum (exclusive).
 * @throws {Error} Throws an error if `maximum` is not greater than `minimum`.
 *
 * @example
 * const result = randomInt(0, 5); // result will be a random integer between 0 (inclusive) and 5 (exclusive)
 * const result2 = randomInt(5, 0); // This will throw an error
 */
export function randomInt(minimum: number, maximum: number): number {
  return Math.floor(random(minimum, maximum));
}
