import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Cyan foreground.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { cyan } from 'es-toolkit/color';
 *
 * console.log(cyan('hello'));
 */
export function cyan(text: string): string {
  return wrapAnsi('\x1b[36m', '\x1b[39m', text);
}
