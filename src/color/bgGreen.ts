import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Green background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgGreen } from 'es-toolkit/color';
 *
 * console.log(bgGreen('hello'));
 */
export function bgGreen(text: string): string {
  const open = '\x1b[42m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
