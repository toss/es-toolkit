/**
 * Removes common leading whitespace from each line of a multi-line string.
 *
 * This function can be used as a regular function, as a tagged template literal,
 * or composed with another tag function (TC39 String.dedent proposal).
 * It calculates the common indentation across all non-empty lines and removes it,
 * preserving relative indentation differences between lines.
 * The first and last lines are removed if they are empty or contain only whitespace.
 *
 * @param {string | TemplateStringsArray | Function} str - The string, template literal, or tag function to dedent.
 * @param {unknown[]} values - The values to interpolate when used as a tagged template literal.
 * @returns {string | Function} The dedented string, or a dedented tag function when composed.
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
      const parts = dedentParts(str);

      let text = parts[0];
      for (let i = 0; i < values.length; i++) {
        text += String(values[i]) + parts[i + 1];
      }

      return text;
    }
  }
}

function dedentTemplateStringsArray(strings: TemplateStringsArray): TemplateStringsArray {
  const parts = dedentParts(strings);

  return Object.assign(parts, { raw: parts }) as unknown as TemplateStringsArray;
}

/**
 * Dedents the static parts of a template literal as a whole, without letting the
 * interpolated values take part in the indentation calculation.
 *
 * Each interpolation is temporarily replaced by a placeholder that contains no
 * whitespace or line break, so it counts as regular content of its line just
 * like the substituted value would.
 */
function dedentParts(strings: ArrayLike<string>): string[] {
  const parts = Array.from(strings);

  if (parts.length === 1) {
    return [dedentImpl(parts[0])];
  }

  let placeholder = '\x00';
  const joinedParts = parts.join('');

  while (joinedParts.includes(placeholder)) {
    placeholder += '\x00';
  }

  return dedentImpl(parts.join(placeholder)).split(placeholder);
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
