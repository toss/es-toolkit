import { makeColor } from './makeColor.ts';
import { parseHex } from './parseHex.ts';
import type { ColorFunction } from './types.ts';

/**
 * Returns a function that wraps text with a 24-bit foreground color parsed from a hex string.
 * Accepts `#RGB`, `#RRGGBB`, or the same without `#`.
 *
 * @param color - A hex color string (e.g. `"#ff6347"`, `"#f00"`).
 * @returns A color function that wraps text with the parsed RGB foreground.
 *
 * @example
 * import { hex } from 'es-toolkit/color';
 *
 * console.log(hex('#ff6347')('hello'));
 */
export function hex(color: string): ColorFunction {
  const [r, g, b] = parseHex(color);
  return makeColor(`\x1b[38;2;${r};${g};${b}m`, '\x1b[39m');
}
