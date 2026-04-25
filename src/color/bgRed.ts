import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Red background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgRed } from 'es-toolkit/color';
 *
 * console.log(bgRed('hello'));
 */
export function bgRed(text: string): string {
  const open = '\x1b[41m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
