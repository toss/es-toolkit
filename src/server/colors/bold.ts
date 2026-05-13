import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bold text. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { colors } from 'es-toolkit/server';
 *
 * console.log(colors.bold('hello'));
 */
export function bold(text: string): string {
  return wrapAnsi('\x1b[1m', '\x1b[22m', text);
}
