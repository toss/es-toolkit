import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Black background. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.bgBlack('hello'));
 */
export function bgBlack(text: string): string {
  return wrapAnsiBg('\x1b[40m', '\x1b[49m', text);
}
