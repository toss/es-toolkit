import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Magenta background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgMagenta } from 'es-toolkit/color';
 *
 * console.log(bgMagenta('hello'));
 */
export function bgMagenta(text: string): string {
  const open = '\x1b[45m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
