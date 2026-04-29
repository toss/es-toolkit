import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright yellow foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { yellowBright } from 'es-toolkit/color';
 *
 * console.log(yellowBright('hello'));
 */
export function yellowBright(text: string): string {
  return wrapAnsi('\x1b[93m', '\x1b[39m', text);
}
