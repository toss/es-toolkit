import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright cyan foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.cyanBright('hello'));
 */
export function cyanBright(text: string): string {
  return wrapAnsi('\x1b[96m', '\x1b[39m', text);
}
