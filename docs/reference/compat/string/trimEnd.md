# trimEnd (Lodash Compatibility)

::: warning Use `trimEnd` from `es-toolkit`

This `trimEnd` function operates slowly due to handling `null` or `undefined` and parameter order changes.

Use the faster and more modern [trimEnd](../../string/trimEnd.md) from `es-toolkit` instead.

:::

Removes trailing whitespace or specified characters from a string.

```typescript
const trimmed = trimEnd(str, chars);
```

## Reference

### `trimEnd(str, chars)`

Use `trimEnd` when you want to remove whitespace or specific characters from the end of a string. If `chars` is not specified, only trailing whitespace will be removed.

```typescript
import { trimEnd } from 'es-toolkit/compat';

// Remove trailing whitespace
trimEnd('  abc  ');
// Returns: '  abc'

// Remove specified characters
trimEnd('-_-abc-_-', '_-');
// Returns: '-_-abc'

// Only applies to the end of the string
trimEnd('abc', 'a');
// Returns: 'abc'
```

`null` or `undefined` is treated as an empty string.

```typescript
import { trimEnd } from 'es-toolkit/compat';

trimEnd(null); // ''
trimEnd(undefined); // ''
```

#### Parameters

- `str` (`string`, optional): The string to trim from the end.
- `chars` (`string`, optional): The characters to remove. If not specified, whitespace will be removed.

#### Returns

(`string`): Returns the string with specified characters removed from the end.
