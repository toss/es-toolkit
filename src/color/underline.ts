import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Underlined text. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { underline } from 'es-toolkit/color';
 *
 * console.log(underline('hello'));
 */
export function underline(text: string): string {
  return wrapAnsi('\x1b[4m', '\x1b[24m', text);
}
