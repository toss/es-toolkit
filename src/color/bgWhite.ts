import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * White background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgWhite } from 'es-toolkit/color';
 *
 * console.log(bgWhite('hello'));
 */
export function bgWhite(text: string): string {
  const open = '\x1b[47m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
