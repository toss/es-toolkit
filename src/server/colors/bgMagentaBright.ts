import { wrapAnsiBg } from './_internal/wrapAnsiBg.ts';

/**
 * Bright magenta background. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.bgMagentaBright('hello'));
 */
export function bgMagentaBright(text: string): string {
  return wrapAnsiBg('\x1b[105m', '\x1b[49m', text);
}
