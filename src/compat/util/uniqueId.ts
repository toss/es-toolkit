import { toString } from './toString';

/** Counter used to generate unique numeric identifiers. */
let idCounter = 0;

/**
 * Generates a unique identifier, optionally prefixed with a given string.
 *
 * This function increments an internal counter to ensure uniqueness within
 * the current session. If a prefix is provided, it is prepended to the
 * generated identifier.
 *
 * @param {string} [prefix] - An optional string to prefix the unique identifier.
 *                            If not provided or not a string, only the unique
 *                            numeric identifier is returned.
 * @returns {string} A string containing the unique identifier, with the optional
 *                   prefix if provided.
 *
 * @example
 * // Generate a unique ID with a prefix
 * uniqueId('user_');  // => 'user_1'
 *
 * @example
 * // Generate a unique ID without a prefix
 * uniqueId();  // => '2'
 *
 * @example
 * // Subsequent calls increment the internal counter
 * uniqueId('item_');  // => 'item_3'
 * uniqueId();         // => '4'
 */
export function uniqueId(prefix = ''): string {
  const id = ++idCounter;

  return `${prefix}${id}`;
}
