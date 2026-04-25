import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Yellow background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgYellow } from 'es-toolkit/color';
 *
 * console.log(bgYellow('hello'));
 */
export function bgYellow(text: string): string {
  return wrapAnsiBg('\x1b[43m', '\x1b[49m', text);
}
