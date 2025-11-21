# padEnd (Lodash compatibility)

::: warning Use JavaScript's `String.prototype.padEnd`

This `padEnd` function operates slower due to handling non-string values.

Instead, use the faster and more modern JavaScript's `String.prototype.padEnd`.

:::

Pads the end of a string to extend it to the specified length.

```typescript
const padded = padEnd(str, length, chars);
```

## Usage

### `padEnd(str, length?, chars?)`

Use `padEnd` when you want to pad the end of a string to match a desired length.

```typescript
import { padEnd } from 'es-toolkit/compat';

// Pad with spaces
padEnd('abc', 6);
// Returns: 'abc   '

// Pad with specific characters
padEnd('abc', 6, '_-');
// Returns: 'abc_-_'

// Return as is if original length is longer
padEnd('abc', 3);
// Returns: 'abc'
```

`null` or `undefined` are treated as empty strings.

```typescript
import { padEnd } from 'es-toolkit/compat';

padEnd(null, 5, '*');
// Returns: '*****'

padEnd(undefined, 3);
// Returns: '   '
```

#### Parameters

- `str` (`string`, optional): The string to add padding to.
- `length` (`number`, optional): The desired final string length. Defaults to `0`.
- `chars` (`string`, optional): The character to use for padding. Defaults to `' '` (space).

#### Returns

(`string`): Returns the string with padding added to the end.
