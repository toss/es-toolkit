# dedent

Removes the common leading whitespace from every line of a multi-line string.

Use it to write multi-line strings that follow your code's indentation, without the indentation ending up in the actual string.

```typescript
const text = dedent`
  Hello
  World
`;
```

## Usage

### `` dedent`text` ``

Use `dedent` as a tagged template literal to write multi-line strings inside indented code. It finds the smallest indentation shared by the non-empty lines and removes it from every line, so relative indentation differences between lines are preserved. If the first or last line contains only whitespace, it is removed.

```typescript
import { dedent } from 'es-toolkit/string';

// The indentation from the code is removed
const message = dedent`
  Hello
  World
`;
// message is 'Hello\nWorld'

// Relative indentation between lines is preserved
const list = dedent`
  Items:
    - First
    - Second
`;
// list is 'Items:\n  - First\n  - Second'

// Interpolated values are inserted before the indentation is removed
const name = 'es-toolkit';
const greeting = dedent`
  Hello, ${name}!
`;
// greeting is 'Hello, es-toolkit!'
```

Lines that contain only whitespace become empty lines, and Windows line endings (`\r\n`) are normalized to `\n`.

```typescript
import { dedent } from 'es-toolkit/string';

// Whitespace-only lines become empty lines
const text = dedent`
  First

  Second
`;
// text is 'First\n\nSecond'
```

#### Parameters

- `str` (`TemplateStringsArray`): The template literal to dedent.
- `values` (`unknown[]`): The values to interpolate into the template literal.

#### Returns

(`string`): The string with the common leading whitespace removed.

### `dedent(str)`

Use `dedent` as a regular function when you already have a string, such as one read from a file or built elsewhere in your code.

```typescript
import { dedent } from 'es-toolkit/string';

// Remove the common indentation from an existing string
const raw = '  Hello\n    World';
const text = dedent(raw);
// text is 'Hello\n  World'
```

#### Parameters

- `str` (`string`): The string to dedent.

#### Returns

(`string`): The string with the common leading whitespace removed.

### `dedent(tagFn)`

Use `dedent` with another tag function to make that tag receive dedented template strings, as in the TC39 `String.dedent` proposal.

```typescript
import { dedent } from 'es-toolkit/string';

// Compose with another tag function
const html = dedent((strings, ...values) => strings.join(''));

const result = html`
  <div>Hello</div>
`;
// result is '<div>Hello</div>'
```

#### Parameters

- `tagFn` (`(strings: TemplateStringsArray, ...values: unknown[]) => T`): The tag function to compose.

#### Returns

(`(strings: TemplateStringsArray, ...values: unknown[]) => T`): A new tag function that removes the common leading whitespace from the template strings before passing them to `tagFn`.
