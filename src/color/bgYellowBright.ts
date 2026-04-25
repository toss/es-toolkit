import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright yellow background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgYellowBright } from 'es-toolkit/color';
 *
 * console.log(bgYellowBright('hello'));
 */
export function bgYellowBright(text: string): string {
  const open = '\x1b[103m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
