import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Bright magenta background.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgMagentaBright } from 'es-toolkit/color';
 *
 * console.log(bgMagentaBright('hello'));
 */
export function bgMagentaBright(text: string): string {
  return wrapAnsiBg('\x1b[105m', '\x1b[49m', text);
}
