import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * White foreground.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { white } from 'es-toolkit/color';
 *
 * console.log(white('hello'));
 */
export function white(text: string): string {
  return wrapAnsi('\x1b[37m', '\x1b[39m', text);
}
