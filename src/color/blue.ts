import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Blue foreground.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { blue } from 'es-toolkit/color';
 *
 * console.log(blue('hello'));
 */
export function blue(text: string): string {
  return wrapAnsi('\x1b[34m', '\x1b[39m', text);
}
