import { toString } from './toString.ts';

let counter = 0;

/**
 * Generates a unique ID. If a `prefix` is provided, the ID is appended to it.
 *
 * @param {string} [prefix=''] - The value to prefix the unique ID with.
 * @returns {string} - Returns the unique ID.
 *
 * @example
 * uniqueId('contact_'); // => 'contact_1'
 *
 * uniqueId(); // => '2'
 */
export function uniqueId(prefix = ''): string {
  return `${toString(prefix)}${++counter}`;
}
