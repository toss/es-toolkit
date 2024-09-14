/**
 * Checks if `value` is an integer.
 *
 * @param {any} value - The value to check
 * @returns {boolean} `true` if `value` is integer, otherwise `false`
 *
 * @example
 * isInteger(3); // Returns: true
 * isInteger(Infinity); // Returns: false
 * isInteger('3'); // Returns: false
<<<<<<< HEAD
 * isInteger([]); // Returns: false
=======
 * isInteger([]]); // Returns: false
>>>>>>> a1271d8 (Implement isInteger)
 */
export function isInteger(value: any): boolean {
  if (typeof value !== 'number') return false;

  return value % 1 === 0;
}
