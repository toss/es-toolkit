import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Black foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.black('hello'));
 */
export function black(text: string): string {
  return wrapAnsi('\x1b[30m', '\x1b[39m', text);
}
