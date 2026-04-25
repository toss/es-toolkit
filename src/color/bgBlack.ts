import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Black background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgBlack } from 'es-toolkit/color';
 *
 * console.log(bgBlack('hello'));
 */
export function bgBlack(text: string): string {
  return wrapAnsiBg('\x1b[40m', '\x1b[49m', text);
}
