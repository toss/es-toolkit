const SHORT_HEX_LENGTH = 3;

const LONG_HEX_LENGTH = 6;

const HEX_PATTERN = /^[0-9a-fA-F]+$/;

/**
 * Validates if a string is a valid hexadecimal color string.
 *
 * @param {string} hex - The hexadecimal color string to validate (without # prefix).
 * @returns {boolean} True if the hex string is valid, false otherwise.
 *
 * @example
 * isValidHex('ff0000'); // true
 * isValidHex('f00'); // true
 * isValidHex('FF0000'); // true
 * isValidHex('gg0000'); // false
 * isValidHex('ff00'); // false (4 digits)
 * isValidHex(''); // false
 */
export function isValidHex(hex: string): boolean {
  if (hex.length !== SHORT_HEX_LENGTH && hex.length !== LONG_HEX_LENGTH) {
    return false;
  }

  return HEX_PATTERN.test(hex);
}
