import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright red foreground.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { redBright } from 'es-toolkit/color';
 *
 * console.log(redBright('hello'));
 */
export function redBright(text: string): string {
  return wrapAnsi('\x1b[91m', '\x1b[39m', text);
}
