import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright cyan foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { cyanBright } from 'es-toolkit/color';
 *
 * console.log(cyanBright('hello'));
 */
export function cyanBright(text: string): string {
  return wrapAnsi('\x1b[96m', '\x1b[39m', text);
}
