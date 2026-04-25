import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright blue background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgBlueBright } from 'es-toolkit/color';
 *
 * console.log(bgBlueBright('hello'));
 */
export function bgBlueBright(text: string): string {
  const open = '\x1b[104m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
