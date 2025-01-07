/**
 * Checks if the given value is a finite number.
 *
 * This function tests whether the provided value is a finite number.
 * It returns `true` if the value is a finite number, and `false` otherwise.
 * The function also serves as a type predicate in TypeScript, narrowing the type of the argument to `number`.
 *
 * @param {unknown} value The value to check.
 * @returns {boolean} if the value is a finite number, `false` otherwise.
 *
 * @example
 * isFiniteNumber(42); // true
 * isFiniteNumber(Infinity); // false
 * isFiniteNumber(-Infinity); // false
 * isFiniteNumber(NaN); // false
 * isFiniteNumber('string'); // false
 */
export function isFiniteNumber(value: unknown): value is number {
    return typeof value === 'number' && isFinite(value);
  }
  