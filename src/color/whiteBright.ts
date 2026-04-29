import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright white foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { whiteBright } from 'es-toolkit/color';
 *
 * console.log(whiteBright('hello'));
 */
export function whiteBright(text: string): string {
  return wrapAnsi('\x1b[97m', '\x1b[39m', text);
}
