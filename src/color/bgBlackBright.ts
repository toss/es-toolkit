import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright black (gray) background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgBlackBright } from 'es-toolkit/color';
 *
 * console.log(bgBlackBright('hello'));
 */
export function bgBlackBright(text: string): string {
  const open = '\x1b[100m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
