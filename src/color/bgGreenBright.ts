import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright green background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgGreenBright } from 'es-toolkit/color';
 *
 * console.log(bgGreenBright('hello'));
 */
export function bgGreenBright(text: string): string {
  const open = '\x1b[102m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
