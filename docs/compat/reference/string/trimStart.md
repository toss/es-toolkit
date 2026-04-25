# trimStart (Lodash Compatibility)

::: warning Use `trimStart` from `es-toolkit`

This `trimStart` function operates slowly due to handling `null` or `undefined` and parameter order changes.

Use the faster and more modern [trimStart](../../string/trimStart.md) from `es-toolkit` instead.

:::

Removes leading whitespace or specified characters from a string.

```typescript
const trimmed = trimStart(str, chars);
```

## Usage

### `trimStart(str, chars)`

Use `trimStart` when you want to remove whitespace or specific characters from the beginning of a string. If `chars` is not specified, only leading whitespace will be removed.

```typescript
import { trimStart } from 'es-toolkit/compat';

// Remove leading whitespace
trimStart('  abc  ');
// Returns: 'abc  '

// Remove specified characters
trimStart('-_-abc-_-', '_-');
// Returns: 'abc-_-'

// Only applies to the beginning of the string
trimStart('abc', 'c');
// Returns: 'abc'
```

`null` or `undefined` is treated as an empty string.

```typescript
import { trimStart } from 'es-toolkit/compat';

trimStart(null); // ''
trimStart(undefined); // ''
```

#### Parameters

- `str` (`string`, optional): The string to trim from the beginning.
- `chars` (`string`, optional): The characters to remove. If not specified, whitespace will be removed.

#### Returns

(`string`): Returns the string with specified characters removed from the beginning.
