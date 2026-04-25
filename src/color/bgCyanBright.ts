import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Bright cyan background. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bgCyanBright } from 'es-toolkit/color';
 *
 * console.log(bgCyanBright('hello'));
 */
export function bgCyanBright(text: string): string {
  return wrapAnsiBg('\x1b[106m', '\x1b[49m', text);
}
