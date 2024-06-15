/**
 * Generates a random floating-point number between minimum (inclusive) and maximum (exclusive).
 * If min is greater than maximum, the values are swapped.
 *
 * @param {number} minimum - The lower bound (inclusive).
 * @param {number} maximum - The upper bound (exclusive).
 * @returns {number} A random integer between minimum (inclusive) and maximum (exclusive).
 *
 * @example
 * const result = random(0, 5); // result will be a random floating-point number between 0 (inclusive) and 5 (exclusive)
 * const result2 = random(5, 0); // This will throw an error
 */
export function random(minimum: number, maximum: number): number {
  if (minimum >= maximum) {
    throw new Error('Invalid input: The maximum value must be greater than the minimum value.');
  }

  return Math.random() * (maximum - minimum) + minimum;
}
