const ANSI_REGEX = new RegExp(`\u001b\\[[0-9;]*m`, 'g');

/**
 * Removes all ANSI color/style escape codes from a string.
 *
 * @param text - The string that may contain ANSI escape codes.
 * @returns The string with all ANSI codes removed.
 *
 * @example
 * import { color, stripAnsi } from 'es-toolkit/color';
 *
 * const colored = color.red('hello');
 * stripAnsi(colored);
 * // Returns: 'hello'
 */
export function stripAnsi(text: string): string {
  return text.replaceAll(ANSI_REGEX, '');
}
