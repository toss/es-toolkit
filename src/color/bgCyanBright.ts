import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright cyan background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgCyanBright } from 'es-toolkit/color';
 *
 * console.log(bgCyanBright('hello'));
 */
export function bgCyanBright(text: string): string {
  const open = '\x1b[106m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
