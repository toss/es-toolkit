import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Strikethrough text. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.strikethrough('hello'));
 */
export function strikethrough(text: string): string {
  return wrapAnsi('\x1b[9m', '\x1b[29m', text);
}
