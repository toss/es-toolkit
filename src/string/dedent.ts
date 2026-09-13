/**
 * Removes common leading whitespace from each line of a multi-line string.
 *
 * This function can be used as a regular function, as a tagged template literal,
 * or composed with another tag function (TC39 String.dedent proposal).
 * It calculates the common indentation across all non-empty lines and removes it,
 * preserving relative indentation differences between lines.
 * The first and last lines are removed if they are empty or contain only whitespace.
 *
 * When used as a tagged template literal or composed with a tag function, the template
 * must have the same shape `String.dedent` requires: the opening line, right after the
 * opening backtick, and the closing line, right before the closing backtick, may contain
 * only whitespace. Otherwise a `TypeError` is thrown.
 *
 * @param {string | TemplateStringsArray | Function} str - The string, template literal, or tag function to dedent.
 * @param {unknown[]} values - The values to interpolate when used as a tagged template literal.
 * @returns {string | Function} The dedented string, or a dedented tag function when composed.
 * @throws {TypeError} If a template literal has content on its opening or closing line.
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
 * `; // "hello\nworld"
 *
 * @example
 * // Tag composition
 * const html = dedent((strings, ...values) => strings.join(''));
 * html`
 *   <div>Hello</div>
 * `; // "<div>Hello</div>"
 */
export function dedent(str: string): string;
export function dedent(str: TemplateStringsArray, ...values: unknown[]): string;
export function dedent<T>(
  tagFn: (strings: TemplateStringsArray, ...values: unknown[]) => T
): (strings: TemplateStringsArray, ...values: unknown[]) => T;
export function dedent(
  str: string | TemplateStringsArray | ((strings: TemplateStringsArray, ...values: unknown[]) => unknown),
  ...values: unknown[]
): unknown {
  switch (typeof str) {
    case 'function': {
      return function (strings: TemplateStringsArray, ...args: unknown[]) {
        return str(dedentTemplateStringsArray(strings), ...args);
      };
    }
    case 'string': {
      return dedentImpl(str);
    }
    default: {
      assertTemplateShape(str);

      let text = str[0];
      for (let i = 0; i < values.length; i++) {
        text += String(values[i]) + str[i + 1];
      }

      return dedentImpl(text);
    }
  }
}

function dedentTemplateStringsArray(strings: TemplateStringsArray): TemplateStringsArray {
  assertTemplateShape(strings);

  const joined = strings.join('\x00');
  const dedented = dedentImpl(joined);
  const parts = dedented.split('\x00');

  return Object.assign(parts, { raw: parts }) as unknown as TemplateStringsArray;
}

/**
 * Checks that a template literal has the shape `String.dedent` requires.
 *
 * Only the static parts of the template are inspected, so interpolated values
 * never affect the check. The opening line must end with a newline and the closing
 * line must be preceded by one, and both may contain only whitespace.
 */
function assertTemplateShape(strings: ArrayLike<string>): void {
  const first = strings[0];
  const openingLineEnd = first.indexOf('\n');

  if (openingLineEnd === -1 || first.slice(0, openingLineEnd).trim() !== '') {
    throw new TypeError('Invalid opening line.');
  }

  const last = strings[strings.length - 1];
  const closingLineStart = last.lastIndexOf('\n');

  if (closingLineStart === -1 || last.slice(closingLineStart + 1).trim() !== '') {
    throw new TypeError('Invalid closing line.');
  }
}

function dedentImpl(text: string): string {
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
