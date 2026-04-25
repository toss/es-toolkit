import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * White background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgWhite } from 'es-toolkit/color';
 *
 * console.log(bgWhite('hello'));
 */
export function bgWhite(text: string): string {
  return wrapAnsiBg('\x1b[47m', '\x1b[49m', text);
}
