import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright red foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.redBright('hello'));
 */
export function redBright(text: string): string {
  return wrapAnsi('\x1b[91m', '\x1b[39m', text);
}
