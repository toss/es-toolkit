import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Wraps text with ANSI codes for red foreground color.
 *
 * @param text - The text to colorize.
 * @returns The text wrapped with red ANSI codes.
 *
 * @example
 * import { red } from 'es-toolkit/color';
 *
 * console.log(red('error'));
 */
export function red(text: string): string {
  return wrapAnsi('\x1b[31m', '\x1b[39m', text);
}
