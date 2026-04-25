import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Cyan background. Wraps text with ANSI codes.
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
  return wrapAnsiBg('\x1b[46m', '\x1b[49m', text);
}
