import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * White foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.white('hello'));
 */
export function white(text: string): string {
  return wrapAnsi('\x1b[37m', '\x1b[39m', text);
}
