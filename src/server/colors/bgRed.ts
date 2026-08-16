import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Red background. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.bgRed('hello'));
 */
export function bgRed(text: string): string {
  return wrapAnsiBg('\x1b[41m', '\x1b[49m', text);
}
