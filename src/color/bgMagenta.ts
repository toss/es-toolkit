import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Magenta background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgMagenta } from 'es-toolkit/color';
 *
 * console.log(bgMagenta('hello'));
 */
export function bgMagenta(text: string): string {
  return wrapAnsiBg('\x1b[45m', '\x1b[49m', text);
}
