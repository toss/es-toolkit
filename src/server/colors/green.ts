import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Green foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.green('hello'));
 */
export function green(text: string): string {
  return wrapAnsi('\x1b[32m', '\x1b[39m', text);
}
