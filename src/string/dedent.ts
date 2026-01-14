/**
 * Removes the common leading indentation from a multi-line string.
 * This function can be used as a tagged template literal or as a regular function.
 *
 * @param {TemplateStringsArray | string} template - The template string array or a standard string.
 * @param {unknown[]} args - The values to be interpolated into the template string.
 * @returns {string} The dedented string with common indentation removed.
 *
 * @example
 * // As a tagged template literal:
 * dedent`
 *   function hello() {
 *     console.log('world');
 *   }
 * `; // returns "function hello() {\n  console.log('world');\n}"
 *
 * @example
 * // As a regular function:
 * dedent("  line 1\n    line 2"); // returns "line 1\n  line 2"
 */
export function dedent(template: TemplateStringsArray | string, ...args: unknown[]): string {
  let result = '';

  if (typeof template === 'string') {
    result = template;
  } else {
    // Handle tagged template literal
    for (let i = 0; i < template.length; i++) {
      result += template[i];
      if (i < args.length) {
        result += String(args[i]);
      }
    }
  }

  const lines = result.split('\n');
  let commonIndent: string | null = null;

  // Find common indentation
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip empty lines or lines with only whitespace
    if (line.trim() === '') {
      continue;
    }

    const match = line.match(/^(\s+)/);
    const indent = match ? match[1] : '';

    if (commonIndent === null) {
      commonIndent = indent;
    } else {
      // Find common prefix (indentation)
      let j = 0;
      while (j < commonIndent.length && j < indent.length && commonIndent[j] === indent[j]) {
        j++;
      }
      commonIndent = commonIndent.substring(0, j);
    }
  }

  // If no common indentation found (or it's empty string), verify if we need to trim the start/end
  // But strictly per logic, if commonIndent is null, it means all lines are empty/whitespace.
  // If commonIndent is "", it means no common indentation.
  const indentToRemove = commonIndent || '';

  const outputLines: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith(indentToRemove)) {
      outputLines.push(line.substring(indentToRemove.length));
    } else {
      if (line.trim() === '') {
        outputLines.push('');
      } else {
        outputLines.push(line);
      }
    }
  }

  // Remove leading newline (opening line)
  if (outputLines.length > 0 && outputLines[0].trim() === '') {
    outputLines.shift();
  }

  // Remove trailing newline (closing line)
  if (outputLines.length > 0 && outputLines[outputLines.length - 1].trim() === '') {
    outputLines.pop();
  }

  return outputLines.join('\n');
}
