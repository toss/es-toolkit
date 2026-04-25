import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Bold text.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { bold } from 'es-toolkit/color';
 *
 * console.log(bold('hello'));
 */
export function bold(text: string): string {
  return wrapAnsi('\x1b[1m', '\x1b[22m', text);
}
