# upperFirst (Lodash Compatibility)

::: warning Use `upperFirst` from `es-toolkit`

This `upperFirst` function operates slowly due to conversion logic for handling `null` or `undefined`.

Use the faster and more modern [upperFirst](../../string/upperFirst.md) from `es-toolkit` instead.

:::

Converts the first character of a string to uppercase.

```typescript
const upperCased = upperFirst(str);
```

## Usage

### `upperFirst(str)`

Use `upperFirst` when you want to capitalize only the first character of a string. The remaining characters stay unchanged.

```typescript
import { upperFirst } from 'es-toolkit/compat';

// String starting with lowercase
upperFirst('fred');
// Returns: 'Fred'

// String already starting with uppercase
upperFirst('Fred');
// Returns: 'Fred'

// All uppercase string
upperFirst('FRED');
// Returns: 'FRED'
```

`null` or `undefined` is treated as an empty string.

```typescript
import { upperFirst } from 'es-toolkit/compat';

upperFirst(null); // ''
upperFirst(undefined); // ''
```

#### Parameters

- `str` (`string`, optional): The string to convert the first character to uppercase.

#### Returns

(`string`): Returns the string with the first character converted to uppercase.
