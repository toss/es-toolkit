/**
 * Removes common leading whitespace from each line of a multi-line string.
 *
 * This function can be used as a regular function or as a tagged template literal.
 * It calculates the common indentation across all non-empty lines and removes it,
 * preserving relative indentation differences between lines.
 * The first and last lines are removed if they are empty or contain only whitespace.
 *
 * @param {string | TemplateStringsArray} str - The string or template literal to dedent.
 * @param {unknown[]} values - The values to interpolate when used as a tagged template literal.
 * @returns {string} The dedented string.
 *
 * @example
 * // As a regular function
 * dedent("  hello\n  world"); // "hello\nworld"
 *
 * @example
 * // As a tagged template literal
 * dedent`
 *   hello
 *   world
 * `; // "hello\nworld\n"
 *
 * @example
 * // Preserves relative indentation
 * dedent`
 *   hello
 *     world
 * `; // "hello\n  world\n"
 */
export function dedent(str: string): string;
export function dedent(str: TemplateStringsArray, ...values: unknown[]): string;
export function dedent(str: string | TemplateStringsArray, ...values: unknown[]): string {
  let text: string;

  if (typeof str === 'string') {
    text = str;
  } else {
    text = str[0];
    for (let i = 0; i < values.length; i++) {
      text += String(values[i]) + str[i + 1];
    }
  }

  text = text.replace(/\r\n/g, '\n');
  const lines = text.split('\n');

  if (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }

  if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }

  let commonIndent = Infinity;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim() === '') {
      continue;
    }

    let indent = 0;
    while (indent < line.length && (line[indent] === ' ' || line[indent] === '\t')) {
      indent++;
    }

    if (indent < commonIndent) {
      commonIndent = indent;
    }
  }

  if (commonIndent === Infinity) {
    return '';
  }

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '') {
      lines[i] = '';
    } else {
      lines[i] = lines[i].slice(commonIndent);
    }
  }

  return lines.join('\n');
}
