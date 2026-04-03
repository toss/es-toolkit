# dedent

Removes common leading whitespace from each line of a multi-line string.

## Signature

```typescript
function dedent(str: string): string;
function dedent(str: TemplateStringsArray, ...values: unknown[]): string;
```

### Parameters

- `str` (`string | TemplateStringsArray`): The string or template literal to dedent.
- `values` (`unknown[]`): The values to interpolate when used as a tagged template literal.

### Returns

(`string`): The dedented string with common leading whitespace removed.

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
```
