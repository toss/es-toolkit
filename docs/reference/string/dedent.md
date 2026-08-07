# dedent

Removes common leading whitespace from each line of a multi-line string.

## Signature

```typescript
function dedent(str: string): string;
function dedent(str: TemplateStringsArray, ...values: unknown[]): string;
function dedent<T>(
  tagFn: (strings: TemplateStringsArray, ...values: unknown[]) => T
): (strings: TemplateStringsArray, ...values: unknown[]) => T;
```

### Parameters

- `str` (`string | TemplateStringsArray | Function`): The string, template literal, or tag function to dedent.
- `values` (`unknown[]`): The values to interpolate when used as a tagged template literal.

### Returns

(`string | Function`): The dedented string, or a dedented tag function when composed.

## Examples

```typescript
import { dedent } from 'es-toolkit/string';

// As a regular function
dedent('  hello\n  world');
// Returns: 'hello\nworld'

// As a tagged template literal
dedent`
  hello
  world
`;
// Returns: 'hello\nworld'

// Preserves relative indentation
dedent`
  hello
    world
`;
// Returns: 'hello\n  world'

// Handles interpolations
const name = 'world';
dedent`
  hello
  ${name}
`;
// Returns: 'hello\nworld'

// Tag composition
const html = dedent((strings, ...values) => strings.join(''));
html` <div>Hello</div> `;
// Returns: '<div>Hello</div>'
```
