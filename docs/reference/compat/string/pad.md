# pad (Lodash compatibility)

::: warning Use `pad` from `es-toolkit`

This `pad` function operates slower due to handling `null` or `undefined`.

Instead, use the faster and more modern [pad](../../string/pad.md) from `es-toolkit`.

:::

Pads a string on both sides with padding characters to reach the specified length.

```typescript
const padded = pad(str, length, chars);
```

## Usage

### `pad(str, length, chars)`

Use `pad` when you want to pad a string on both sides to match a desired length. If the padding characters don't divide evenly, extra characters are placed on the right.

```typescript
import { pad } from 'es-toolkit/compat';

// Pad with default spaces
pad('abc', 8);
// Returns: '  abc   '

// Pad with specified characters
pad('abc', 8, '_-');
// Returns: '_-abc_-_'

// Return as is if already long enough
pad('abc', 3);
// Returns: 'abc'

// Return as is if length is shorter
pad('abc', 2);
// Returns: 'abc'
```

`null` or `undefined` are treated as empty strings.

```typescript
import { pad } from 'es-toolkit/compat';

pad(null, 5); // '     '
pad(undefined, 3, '*'); // '***'
```

#### Parameters

- `str` (`string`, optional): The string to pad.
- `length` (`number`, optional): The target length. Defaults to `0`.
- `chars` (`string`, optional): The characters to use for padding. Defaults to space `' '`.

#### Returns

(`string`): Returns the string padded to the specified length.
