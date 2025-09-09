import { clamp } from './clamp.ts';
import { random as randomToolkit } from '../../math/random.ts';
import { randomInt as randomIntToolkit } from '../../math/randomInt.ts';

/**
 * Generate a random number between 0 and 1.
 * @param {boolean} [floating] - Whether to return a floating point number. Defaults to true.
 * @returns {number} A random number between 0 and 1.
 * @example
 * random(); // Returns a random number between 0 and 1
 * random(true); // Returns a random floating point number between 0 and 1
 * random(false); // Returns a random integer between 0 and 1
 */
export function random(floating?: boolean): number;

/**
 * Generate a random number between 0 and max.
 * @param {number} max - The upper bound (exclusive).
 * @param {boolean} [floating] - Whether to return a floating point number. Defaults to true.
 * @returns {number} A random number between 0 and max.
 * @example
 * random(5); // Returns a random number between 0 and 5
 * random(10, true); // Returns a random floating point number between 0 and 10
 * random(3, false); // Returns a random integer between 0 and 3
 */
export function random(max: number, floating?: boolean): number;

/**
 * Generate a random number between min and max.
 * @param {number} min - The lower bound (inclusive).
 * @param {number} max - The upper bound (exclusive).
 * @param {boolean} [floating] - Whether to return a floating point number. Defaults to true.
 * @returns {number} A random number between min and max.
 * @example
 * random(1, 5); // Returns a random number between 1 and 5
 * random(0, 10, true); // Returns a random floating point number between 0 and 10
 * random(1, 6, false); // Returns a random integer between 1 and 6
 */
export function random(min: number, max: number, floating?: boolean): number;

/**
 * Generate a random number between 0 and min, using guard object for special cases.
 * @param {number} min - The upper bound (exclusive).
 * @param {string | number} index - The index or key to check in the guard object.
 * @param {object} guard - The guard object to validate the parameters.
 * @returns {number} A random number between 0 and min.
 * @example
 * const guard = { 5: 5 };
 * random(5, 5, guard); // Returns a random number between 0 and 5
 */
export function random(min: number, index: string | number, guard: object): number;

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
  let minimum = 0;
  let maximum = 1;
  let floating = false;

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
    // eslint-disable-next-line no-fallthrough
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
