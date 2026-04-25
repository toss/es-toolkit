import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright red background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgRedBright } from 'es-toolkit/color';
 *
 * console.log(bgRedBright('hello'));
 */
export function bgRedBright(text: string): string {
  const open = '\x1b[101m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
