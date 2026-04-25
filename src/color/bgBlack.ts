import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Black background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgBlack } from 'es-toolkit/color';
 *
 * console.log(bgBlack('hello'));
 */
export function bgBlack(text: string): string {
  const open = '\x1b[40m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
