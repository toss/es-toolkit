import { reopenAtNewlines } from './_internal/reopenAtNewlines.ts';
import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Cyan background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgCyan } from 'es-toolkit/color';
 *
 * console.log(bgCyan('hello'));
 */
export function bgCyan(text: string): string {
  const open = '\x1b[46m';
  const close = '\x1b[49m';
  return wrapAnsi(open, close, reopenAtNewlines(open, close, text));
}
