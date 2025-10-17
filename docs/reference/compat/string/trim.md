# trim (Lodash Compatibility)

::: warning Use `trim` from `es-toolkit`

This `trim` function operates slowly due to handling `null` or `undefined` and array-type `chars`.

Use the faster and more modern [trim](../../string/trim.md) from `es-toolkit` instead.

:::

Removes leading and trailing whitespace or specified characters from a string.

```typescript
const trimmed = trim(str, chars);
```

## Reference

### `trim(str, chars)`

Use `trim` when you want to remove whitespace or specific characters from the beginning and end of a string. If `chars` is not specified, only leading and trailing whitespace will be removed.

```typescript
import { trim } from 'es-toolkit/compat';

// Remove leading and trailing whitespace
trim('  hello  ');
// Returns: 'hello'

// Remove specified characters
trim('--hello--', '-');
// Returns: 'hello'

// Remove multiple characters with an array
trim('##hello##', ['#', 'o']);
// Returns: 'hell'
```

`null` or `undefined` is treated as an empty string.

```typescript
import { trim } from 'es-toolkit/compat';

trim(null); // ''
trim(undefined); // ''
```

#### Parameters

- `str` (`string`, optional): The string to trim.
- `chars` (`string`, optional): The characters to remove. If not specified, whitespace will be removed.

#### Returns

(`string`): Returns the string with specified characters removed from the beginning and end.
