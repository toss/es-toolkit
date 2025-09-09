/**
 * Returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
 *
 * @returns {number} The current time in milliseconds.
 *
 * @example
 * const currentTime = now();
 * console.log(currentTime); // Outputs the current time in milliseconds
 *
 * @example
 * const startTime = now();
 * // Some time-consuming operation
 * const endTime = now();
 * console.log(`Operation took ${endTime - startTime} milliseconds`);
 */
export function now(): number {
  return Date.now();
}
