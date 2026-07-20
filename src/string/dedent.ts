/**
 * Removes the common leading whitespace from each line of a multi-line
 * string. Useful for tagged template literals, where the embedded source is
 * uniformly indented with the surrounding code.
 *
 * A leading newline plus a trailing whitespace-only line are stripped (the
 * common shape of a template literal that starts on its own line), and the
 * minimum common leading-whitespace length is removed from every line.
 *
 * See the [TC39 String.dedent proposal](https://github.com/tc39/proposal-string-dedent).
 *
 * @param str - The multi-line string to dedent.
 * @returns The dedented string.
 *
 * @example
 * const message = dedent(`
 *   function add(a, b) {
 *     return a + b;
 *   }
 * `);
 * // 'function add(a, b) {\n  return a + b;\n}'
 *
 * @example
 * dedent('  a\n  b') // 'a\nb'
 */
export function dedent(str: string): string {
  const normalized = str.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');

  // Strip a leading empty/whitespace-only line (common with template literals
  // that start on their own line) and a trailing whitespace-only last line.
  if (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }
  if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }

  if (lines.length === 0) {
    return '';
  }

  // The common indentation is the minimum leading-whitespace length across
  // non-blank lines.
  const indents = lines
    .filter(line => line.trim().length > 0)
    .map(line => {
      const match = line.match(/^[ \t]*/);
      return match ? match[0].length : 0;
    });

  const minIndent = indents.length > 0 ? Math.min(...indents) : 0;

  if (minIndent === 0) {
    return lines.join('\n');
  }

  const dedented = lines.map(line => {
    // Only strip the common indent from lines that have at least that much
    // leading whitespace; leave blank lines untouched.
    const leading = /^[ \t]*/.exec(line)![0];
    if (leading.length >= minIndent) {
      return line.slice(minIndent);
    }
    return line;
  });

  return dedented.join('\n');
}
