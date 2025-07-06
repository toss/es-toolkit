import { isValidRgbValue } from './isValidRgbValue.ts';

/**
 * Converts RGB color values to a hexadecimal color string.
 *
 * @param {number} r - The red component (0-255 integer).
 * @param {number} g - The green component (0-255 integer).
 * @param {number} b - The blue component (0-255 integer).
 * @returns {string} The hexadecimal color string (e.g., '#ff0000').
 * @throws {Error} If any RGB value is not an integer between 0 and 255.
 *
 * @example
 * rgbToHex(255, 0, 0); // '#ff0000'
 * rgbToHex(0, 255, 0); // '#00ff00'
 * rgbToHex(0, 0, 255); // '#0000ff'
 * rgbToHex(255, 255, 255); // '#ffffff'
 * rgbToHex(0, 0, 0); // '#000000'
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const rgbValues = [r, g, b];
  const processedValues = rgbValues.map(value => {
    if (!isValidRgbValue(value)) {
      throw new Error('RGB values must be integers between 0 and 255');
    }

    return value;
  });
  const hexValues = processedValues.map(value => value.toString(16).padStart(2, '0'));

  return `#${hexValues.join('')}`;
}
