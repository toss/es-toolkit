import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright magenta foreground.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { magentaBright } from 'es-toolkit/color';
 *
 * console.log(magentaBright('hello'));
 */
export function magentaBright(text: string): string {
  return wrapAnsi('\x1b[95m', '\x1b[39m', text);
}
