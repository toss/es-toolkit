import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Bright green background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgGreenBright } from 'es-toolkit/color';
 *
 * console.log(bgGreenBright('hello'));
 */
export function bgGreenBright(text: string): string {
  return wrapAnsiBg('\x1b[102m', '\x1b[49m', text);
}
