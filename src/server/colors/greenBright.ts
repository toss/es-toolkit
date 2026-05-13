import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright green foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.greenBright('hello'));
 */
export function greenBright(text: string): string {
  return wrapAnsi('\x1b[92m', '\x1b[39m', text);
}
