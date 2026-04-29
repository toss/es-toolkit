import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bright blue foreground. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { blueBright } from 'es-toolkit/color';
 *
 * console.log(blueBright('hello'));
 */
export function blueBright(text: string): string {
  return wrapAnsi('\x1b[94m', '\x1b[39m', text);
}
