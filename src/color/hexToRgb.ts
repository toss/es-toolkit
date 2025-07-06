import { isValidHex } from './isValidHex.ts';

/**
 * RGB color object
 */
interface RgbColor {
  r: number;
  g: number;
  b: number;
}

const SHORT_HEX_LENGTH = 3;

/**
 * Converts a hexadecimal color string to RGB color values.
 *
 * @param {string} hex - The hexadecimal color string (e.g., '#ff0000', '#f00', 'ff0000', 'f00').
 * @returns {RgbColor} The RGB color object with r, g, b properties (0-255).
 * @throws {Error} If the hex string is invalid.
 *
 * @example
 * hexToRgb('#ff0000'); // { r: 255, g: 0, b: 0 }
 * hexToRgb('#00ff00'); // { r: 0, g: 255, b: 0 }
 * hexToRgb('#0000ff'); // { r: 0, g: 0, b: 255 }
 * hexToRgb('#f00'); // { r: 255, g: 0, b: 0 }
 * hexToRgb('ff0000'); // { r: 255, g: 0, b: 0 }
 */
export function hexToRgb(hex: string): RgbColor {
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  if (!isValidHex(cleanHex)) {
    throw new Error('Invalid hex color string');
  }

  const expandedHex =
    cleanHex.length === SHORT_HEX_LENGTH
      ? cleanHex
          .split('')
          .map(char => char + char)
          .join('')
      : cleanHex;

  const r = parseInt(expandedHex.slice(0, 2), 16);
  const g = parseInt(expandedHex.slice(2, 4), 16);
  const b = parseInt(expandedHex.slice(4, 6), 16);

  return {
    r,
    g,
    b,
  };
}
