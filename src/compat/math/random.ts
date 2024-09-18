import { random as randomToolkit } from '../../math/random.ts';
import { randomInt as randomIntToolkit } from '../../math/randomInt.ts';
import { clamp } from './clamp.ts';

/**
 * Generate a random number within 0 and 1.
 *
 * @returns {number} A random number between 0 (inclusive) and 1 (exclusive). The number can be an integer or a decimal.
 * @throws {Error} Throws an error if `maximum` is not greater than `0`.
 *
 * @example
 * const result = random(); // Returns a random number between 0 and 1.
 */
export function random(floating?: boolean): number;

/**
 * Generate a random number within 0 and 1.
 *
 * @returns {number} A random number between 0 (inclusive) and 1 (exclusive). The number can be an integer or a decimal.
 * @throws {Error} Throws an error if `maximum` is not greater than `0`.
 *
 * @example
 * const result = random(); // Returns a random number between 0 and 1.
 */
export function random(min: number, index: string | number, guard: object): number;

/**
 * Generate a random number within the given range.
 *
 * If only one argument is provided, a number between `0` and the given number is returned.
 *
 * @param {number} maximum - The upper bound (exclusive).
 * @returns {number} A random number between 0 (inclusive) and maximum (exclusive). The number can be an integer or a decimal.
 * @throws {Error} Throws an error if `maximum` is not greater than `0`.
 *
 * @example
 * const result1 = random(5); // Returns a random number between 0 and 5.
 * const result2 = random(0); // Returns a random number between 0 and 0 (which is 0).
 */
export function random(maximum: number, floating?: boolean): number;

/**
 * Generate a random number within the given range.
 *
 * @param {number} minimum - The lower bound (inclusive).
 * @param {number} maximum - The upper bound (exclusive).
 * @returns {number} A random number between minimum (inclusive) and maximum (exclusive). The number can be an integer or a decimal.
 * @throws {Error} Throws an error if `maximum` is not greater than `minimum`.
 *
 * @example
 * const result1 = random(0, 5); // Returns a random number between 0 and 5.
 * const result2 = random(5, 0); // If the minimum is greater than the maximum, an error is thrown.
 * const result3 = random(5, 5); // If the minimum is equal to the maximum, an error is thrown.
 */
export function random(minimum: number, maximum: number, floating?: boolean): number;

/**
 * Generate a random number within the given range.
 *
 * @param {number} minimum - The lower bound (inclusive).
 * @param {number} maximum - The upper bound (exclusive).
 * @returns {number} A random number between minimum (inclusive) and maximum (exclusive). The number can be an integer or a decimal.
 * @throws {Error} Throws an error if `maximum` is not greater than `minimum`.
 *
 * @example
 * const result1 = random(0, 5); // Returns a random number between 0 and 5.
 * const result2 = random(5, 0); // If the minimum is greater than the maximum, an error is thrown.
 * const result3 = random(5, 5); // If the minimum is equal to the maximum, an error is thrown.
 */
export function random(...args: any[]): number {
  let minimum: number = 0;
  let maximum: number = 1;
  let floating: boolean = false;

  switch (args.length) {
    case 1: {
      if (typeof args[0] === 'boolean') {
        floating = args[0];
      } else {
        maximum = args[0];
      }

      break;
    }
    case 2: {
      if (typeof args[1] === 'boolean') {
        maximum = args[0];
        floating = args[1];
      } else {
        minimum = args[0];
        maximum = args[1];
      }
    }
    case 3: {
      if (typeof args[2] === 'object' && args[2] != null && args[2][args[1]] === args[0]) {
        minimum = 0;
        maximum = args[0];
        floating = false;
      } else {
        minimum = args[0];
        maximum = args[1];
        floating = args[2];
      }
    }
  }

  if (typeof minimum !== 'number') {
    minimum = Number(minimum);
  }

  if (typeof maximum !== 'number') {
    minimum = Number(maximum);
  }

  if (!minimum) {
    minimum = 0;
  }

  if (!maximum) {
    maximum = 0;
  }

  if (minimum > maximum) {
    [minimum, maximum] = [maximum, minimum];
  }

  minimum = clamp(minimum, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  maximum = clamp(maximum, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

  if (minimum === maximum) {
    return minimum;
  }

  if (floating) {
    return randomToolkit(minimum, maximum + 1);
  } else {
    return randomIntToolkit(minimum, maximum + 1);
  }
}
