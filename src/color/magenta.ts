import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Magenta foreground.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { magenta } from 'es-toolkit/color';
 *
 * console.log(magenta('hello'));
 */
export function magenta(text: string): string {
  return wrapAnsi('\x1b[35m', '\x1b[39m', text);
}
