import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright green foreground.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { greenBright } from 'es-toolkit/color';
 *
 * console.log(greenBright('hello'));
 */
export function greenBright(text: string): string {
  return wrapAnsi('\x1b[92m', '\x1b[39m', text);
}
