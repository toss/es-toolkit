import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Green foreground.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { green } from 'es-toolkit/color';
 *
 * console.log(green('hello'));
 */
export function green(text: string): string {
  return wrapAnsi('\x1b[32m', '\x1b[39m', text);
}
