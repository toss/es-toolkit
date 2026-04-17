// Matches SGR (Select Graphic Rendition) sequences only: \x1b[...m
// This intentionally does not cover cursor movement, OSC, or other ANSI sequences.
const SGR_REGEX = new RegExp(`${String.fromCharCode(0x1b)}\\[[0-9;]*m`, 'g');

/**
 * Removes ANSI color and style escape codes from a string.
 *
 * Only strips SGR sequences produced by this module (e.g. `\x1b[31m`, `\x1b[38;5;196m`).
 * Does not strip cursor movement, OSC hyperlinks, or other non-SGR sequences.
 *
 * @param text - The string that may contain ANSI color/style escape codes.
 * @returns The string with all color/style codes removed.
 *
 * @example
 * import { red, stripColor } from 'es-toolkit/color';
 *
 * stripColor(red('hello'));
 * // Returns: 'hello'
 */
export function stripColor(text: string): string {
  return text.replaceAll(SGR_REGEX, '');
}
