import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Bright black (gray) background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgBlackBright } from 'es-toolkit/color';
 *
 * console.log(bgBlackBright('hello'));
 */
export function bgBlackBright(text: string): string {
  return wrapAnsiBg('\x1b[100m', '\x1b[49m', text);
}
