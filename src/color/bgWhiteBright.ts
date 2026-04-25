import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright white background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgWhiteBright } from 'es-toolkit/color';
 *
 * console.log(bgWhiteBright('hello'));
 */
export function bgWhiteBright(text: string): string {
  const open = '\x1b[107m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
