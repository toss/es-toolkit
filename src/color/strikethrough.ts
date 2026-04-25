import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Strikethrough text.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { strikethrough } from 'es-toolkit/color';
 *
 * console.log(strikethrough('hello'));
 */
export function strikethrough(text: string): string {
  return wrapAnsi('\x1b[9m', '\x1b[29m', text);
}
