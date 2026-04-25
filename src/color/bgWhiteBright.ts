import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Bright white background. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgWhiteBright } from 'es-toolkit/color';
 *
 * console.log(bgWhiteBright('hello'));
 */
export function bgWhiteBright(text: string): string {
  return wrapAnsiBg('\x1b[107m', '\x1b[49m', text);
}
