import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Blue background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgBlue } from 'es-toolkit/color';
 *
 * console.log(bgBlue('hello'));
 */
export function bgBlue(text: string): string {
  const open = '\x1b[44m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
