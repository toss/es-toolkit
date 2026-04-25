import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Yellow background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgYellow } from 'es-toolkit/color';
 *
 * console.log(bgYellow('hello'));
 */
export function bgYellow(text: string): string {
  const open = '\x1b[43m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
