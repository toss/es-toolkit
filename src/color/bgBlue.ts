import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Blue background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgBlue } from 'es-toolkit/color';
 *
 * console.log(bgBlue('hello'));
 */
export function bgBlue(text: string): string {
  return wrapAnsiBg('\x1b[44m', '\x1b[49m', text);
}
