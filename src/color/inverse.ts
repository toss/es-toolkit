import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Color-inverted text.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { inverse } from 'es-toolkit/color';
 *
 * console.log(inverse('hello'));
 */
export function inverse(text: string): string {
  return wrapAnsi('\x1b[7m', '\x1b[27m', text);
}
