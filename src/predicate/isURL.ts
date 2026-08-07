/**
 * Checks if a value is a valid URL string.
 *
 * Uses JavaScript's built-in URL constructor to validate the URL.
 * Valid URL format must include a protocol (http, https, etc.).
 *
 * This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `string`.
 *
 * Note: This implementation uses a try-catch block with the URL constructor instead of URL.canParse
 * because URL.canParse is a relatively new feature and might not be available in older environments,
 * improving compatibility.
 *
 * @param {unknown} value The value to check for URL validity.
 * @param {string} [base] The base URL to resolve against if the input value is a relative URL.
 * @returns {value is string} Returns `true` if the value is a valid URL, else `false`.
 *
 * @example
 * isURL('https://example.com'); // true
 * isURL('http://localhost:3000'); // true
 * isURL('https://example.com/path?query=123#hash'); // true
 * isURL('example.com'); // false (no protocol)
 * isURL('not a url'); // false
 * isURL(123); // false
 * isURL(null); // false
 *
 * // Using base URL parameter
 * isURL('/products', 'https://example.com'); // true
 * isURL('about', 'https://example.com/'); // true
 */
export function isURL(value: unknown, base?: string): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  // Empty strings are not valid URLs
  if (value.trim() === '') {
    return false;
  }

  // Validate relative URL format when base is provided
  if (base !== undefined) {
    const validRelativeStart = /^[a-z0-9.\-_~!$&'()*+,;=:@/?#]+$/i;
    if (!validRelativeStart.test(value)) {
      return false;
    }
  }

  try {
    new URL(value, base);
    return true;
  } catch {
    return false;
  }
}
