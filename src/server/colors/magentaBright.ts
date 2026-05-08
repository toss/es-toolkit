import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright magenta foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.magentaBright('hello'));
 */
export function magentaBright(text: string): string {
  return wrapAnsi('\x1b[95m', '\x1b[39m', text);
}
