import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Hidden text.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { hidden } from 'es-toolkit/color';
 *
 * console.log(hidden('hello'));
 */
export function hidden(text: string): string {
  return wrapAnsi('\x1b[8m', '\x1b[28m', text);
}
