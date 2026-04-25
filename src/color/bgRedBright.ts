import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Bright red background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgRedBright } from 'es-toolkit/color';
 *
 * console.log(bgRedBright('hello'));
 */
export function bgRedBright(text: string): string {
  return wrapAnsiBg('\x1b[101m', '\x1b[49m', text);
}
