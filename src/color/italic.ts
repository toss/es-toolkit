import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Italic text. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { italic } from 'es-toolkit/color';
 *
 * console.log(italic('hello'));
 */
export function italic(text: string): string {
  return wrapAnsi('\x1b[3m', '\x1b[23m', text);
}
