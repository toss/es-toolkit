/**
 * Converts a deep key string into an array of path segments.
 *
 * This function takes a string representing a deep key (e.g., 'a.b.c' or 'a[b][c]') and breaks it down into an array of strings, each representing a segment of the path.
 *
 * @param {any} deepKey - The deep key string to convert.
 * @returns {string[]} An array of strings, each representing a segment of the path.
 *
 * Examples:
 *
 * toPath('a.b.c') // Returns ['a', 'b', 'c']
 * toPath('a[b][c]') // Returns ['a', 'b', 'c']
 * toPath('.a.b.c') // Returns ['', 'a', 'b', 'c']
 * toPath('a["b.c"].d') // Returns ['a', 'b.c', 'd']
 * toPath('') // Returns []
 * toPath('.a[b].c.d[e]["f.g"].h') // Returns ['', 'a', 'b', 'c', 'd', 'e', 'f.g', 'h']
 */
export function toPath(deepKey: any): string[] {
  const result: string[] = [];
  const length = deepKey.length;

  if (length === 0) {
    return result;
  }

  let index = 0;
  let key = '';
  let quoteChar = '';
  let bracket = false;

  // Leading dot
  if (deepKey.charCodeAt(0) === 46) {
    result.push('');
    index++;
  }

  while (index < length) {
    const char = deepKey[index];

    if (quoteChar) {
      if (char === '\\' && index + 1 < length) {
        // Escape character
        index++;
        key += deepKey[index];
      } else if (char === quoteChar) {
        // End of quote
        quoteChar = '';
      } else {
        key += char;
      }
    } else if (bracket) {
      if (char === '"' || char === "'") {
        // Start of quoted string inside brackets
        quoteChar = char;
      } else if (char === ']') {
        // End of bracketed segment
        bracket = false;
        result.push(key);
        key = '';
      } else {
        key += char;
      }
    } else {
      if (char === '[') {
        // Start of bracketed segment
        bracket = true;
        if (key) {
          result.push(key);
          key = '';
        }
      } else if (char === '.') {
        if (key) {
          result.push(key);
          key = '';
        }
      } else {
        key += char;
      }
    }

    index++;
  }

  if (key) {
    result.push(key);
  }

  return result;
}
