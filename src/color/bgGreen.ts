import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Green background. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgGreen } from 'es-toolkit/color';
 *
 * console.log(bgGreen('hello'));
 */
export function bgGreen(text: string): string {
  return wrapAnsiBg('\x1b[42m', '\x1b[49m', text);
}
