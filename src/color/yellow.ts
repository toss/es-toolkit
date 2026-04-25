import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Yellow foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { yellow } from 'es-toolkit/color';
 *
 * console.log(yellow('hello'));
 */
export function yellow(text: string): string {
  return wrapAnsi('\x1b[33m', '\x1b[39m', text);
}
