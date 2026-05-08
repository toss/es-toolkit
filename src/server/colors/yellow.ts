import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Yellow foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.yellow('hello'));
 */
export function yellow(text: string): string {
  return wrapAnsi('\x1b[33m', '\x1b[39m', text);
}
