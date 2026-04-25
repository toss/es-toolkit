import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Black foreground.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { black } from 'es-toolkit/color';
 *
 * console.log(black('hello'));
 */
export function black(text: string): string {
  return wrapAnsi('\x1b[30m', '\x1b[39m', text);
}
