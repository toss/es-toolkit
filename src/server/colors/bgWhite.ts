import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * White background. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.bgWhite('hello'));
 */
export function bgWhite(text: string): string {
  return wrapAnsiBg('\x1b[47m', '\x1b[49m', text);
}
