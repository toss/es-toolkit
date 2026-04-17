import { makeColor } from './makeColor.ts';
import { parseHex } from './parseHex.ts';
import type { ColorFunction } from './types.ts';

/**
 * Returns a function that wraps text with a 24-bit background color parsed from a hex string.
 * Accepts `#RGB`, `#RRGGBB`, or the same without `#`.
 *
 * @param color - A hex color string (e.g. `"#ff6347"`, `"#f00"`).
 * @returns A color function that wraps text with the parsed RGB background.
 *
 * @example
 * import { bgHex } from 'es-toolkit/color';
 *
 * console.log(bgHex('#ff6347')('hello'));
 */
export function bgHex(color: string): ColorFunction {
  const [r, g, b] = parseHex(color);
  return makeColor(`\x1b[48;2;${r};${g};${b}m`, '\x1b[49m', true);
}
