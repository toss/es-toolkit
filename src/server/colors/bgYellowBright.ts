import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Bright yellow background. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.bgYellowBright('hello'));
 */
export function bgYellowBright(text: string): string {
  return wrapAnsiBg('\x1b[103m', '\x1b[49m', text);
}
