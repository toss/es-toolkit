/**
 * Escapes the RegExp special characters "^", "$", "\\", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", and "|" in `str`.
 *
 * @param {string} str The string to escape.
 * @returns {string} Returns the escaped string.
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}
