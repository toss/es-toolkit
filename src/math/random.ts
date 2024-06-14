/**
 * Generates a random floating-point number between min (inclusive) and max (exclusive).
 * If min is greater than max, the values are swapped.
 *
 * @param {number} min - The lower bound (inclusive).
 * @param {number} max - The upper bound (exclusive).
 * @returns {number} A random integer between min (inclusive) and max (exclusive).
 *
 * @example
 * const result = random(0, 5); // result will be a random floating-point number between 0 (inclusive) and 5 (exclusive)
 * const result2 = random(5, 0); // result2 will also be a random floating-point number between 0 (inclusive) and 5 (exclusive)
 */
export function random(min: number, max: number): number {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.random() * (max - min) + min;
}
