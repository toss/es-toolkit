import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Red foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { red } from 'es-toolkit/color';
 *
 * console.log(red('error'));
 */
export function red(text: string): string {
  return wrapAnsi('\x1b[31m', '\x1b[39m', text);
}
