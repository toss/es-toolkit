import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright white foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.whiteBright('hello'));
 */
export function whiteBright(text: string): string {
  return wrapAnsi('\x1b[97m', '\x1b[39m', text);
}
