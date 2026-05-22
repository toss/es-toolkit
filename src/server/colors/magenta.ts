import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Magenta foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.magenta('hello'));
 */
export function magenta(text: string): string {
  return wrapAnsi('\x1b[35m', '\x1b[39m', text);
}
