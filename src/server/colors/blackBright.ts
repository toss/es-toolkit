import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright black (gray) foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.blackBright('hello'));
 */
export function blackBright(text: string): string {
  return wrapAnsi('\x1b[90m', '\x1b[39m', text);
}
