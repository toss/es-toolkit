/**
 * A tag function type that can be used with template literals.
 */
type TagFunction<T = unknown> = (strings: TemplateStringsArray, ...values: unknown[]) => T;

/**
 * Removes the common leading indentation from a multi-line string.
 *
 * This function can be used as a tagged template literal, a regular function,
 * or composed with another tag function (TC39 String.dedent proposal).
 *
 * @param {TemplateStringsArray} template - The template string array.
 * @param {unknown[]} args - The values to be interpolated.
 * @returns {string} - The dedented string.
 *
 * @example
 * dedent`
 *   hello
 *   world
 * `; // returns "hello\nworld"
 *
 * @example
 * dedent("  hello\n  world"); // returns "hello\nworld"
 *
 * @example
 * const html = (s: TemplateStringsArray) => s.join('');
 * dedent(html)`
 *   <div>Hello</div>
 * `; // returns "<div>Hello</div>"
 */
export function dedent(template: TemplateStringsArray, ...args: unknown[]): string;
export function dedent(str: string): string;
export function dedent<T>(tagFn: TagFunction<T>): TagFunction<T>;
export function dedent<T>(
  template: TemplateStringsArray | string | TagFunction<T>,
  ...args: unknown[]
): string | TagFunction<T> {
  if (typeof template === 'function') {
    const tagFn = template;
    return function dedentedTag(strings: TemplateStringsArray, ...values: unknown[]): T {
      const dedentedStrings = dedentTemplateStringsArray(strings);
      return tagFn(dedentedStrings, ...values);
    };
  }

  if (typeof template === 'string') {
    return processDedent(template);
  }

  let result = '';
  for (let i = 0; i < template.length; i++) {
    result += template[i];
    if (i < args.length) {
      result += String(args[i]);
    }
  }

  return processDedent(result);
}

function dedentTemplateStringsArray(strings: TemplateStringsArray): TemplateStringsArray {
  const joined = strings.join('\x00');
  const dedented = processDedent(joined);
  const result = dedented.split('\x00');

  const templateArray = result as unknown as TemplateStringsArray;
  Object.defineProperty(templateArray, 'raw', {
    value: result,
    writable: false,
    enumerable: false,
    configurable: false,
  });

  return templateArray;
}

function processDedent(input: string): string {
  const lines = input.split('\n');
  let commonIndent: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim() === '') {
      continue;
    }

    const match = line.match(/^(\s+)/);
    const indent = match ? match[1] : '';

    if (commonIndent === null) {
      commonIndent = indent;
    } else {
      let j = 0;
      while (j < commonIndent.length && j < indent.length && commonIndent[j] === indent[j]) {
        j++;
      }
      commonIndent = commonIndent.substring(0, j);
    }
  }

  const indentToRemove = commonIndent || '';

  const outputLines: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith(indentToRemove)) {
      outputLines.push(line.substring(indentToRemove.length));
    } else {
      outputLines.push('');
    }
  }

  if (outputLines.length > 0 && outputLines[0].trim() === '') {
    outputLines.shift();
  }

  if (outputLines.length > 0 && outputLines[outputLines.length - 1].trim() === '') {
    outputLines.pop();
  }

  return outputLines.join('\n');
}
