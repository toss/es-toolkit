import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Blue foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.blue('hello'));
 */
export function blue(text: string): string {
  return wrapAnsi('\x1b[34m', '\x1b[39m', text);
}
