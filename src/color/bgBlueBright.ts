import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Bright blue background. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgBlueBright } from 'es-toolkit/color';
 *
 * console.log(bgBlueBright('hello'));
 */
export function bgBlueBright(text: string): string {
  return wrapAnsiBg('\x1b[104m', '\x1b[49m', text);
}
