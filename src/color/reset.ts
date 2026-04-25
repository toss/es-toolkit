import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Resets all styles and colors.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { reset } from 'es-toolkit/color';
 *
 * console.log(reset('hello'));
 */
export function reset(text: string): string {
  return wrapAnsi('\x1b[0m', '\x1b[0m', text);
}
