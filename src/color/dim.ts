import { wrapAnsi } from './_internal/wrapAnsi.ts';

/**
 * Dim (faint) text. Wraps text with ANSI codes.
 *
 * @param text - The text to style.
 * @returns The styled text.
 *
 * @example
 * import { dim } from 'es-toolkit/color';
 *
 * console.log(dim('hello'));
 */
export function dim(text: string): string {
  return wrapAnsi('\x1b[2m', '\x1b[22m', text);
}
