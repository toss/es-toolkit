import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Yellow background. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.bgYellow('hello'));
 */
export function bgYellow(text: string): string {
  return wrapAnsiBg('\x1b[43m', '\x1b[49m', text);
}
