# lowerFirst (Lodash compatibility)

::: warning Use `lowerFirst` from `es-toolkit`

This `lowerFirst` function operates slower due to handling non-string input values.

Instead, use the faster and more modern [lowerFirst](../../string/lowerFirst.md) from `es-toolkit`.

:::

Converts the first character of a string to lowercase.

```typescript
const result = lowerFirst(str);
```

## Usage

### `lowerFirst(str)`

Converts the first character of a string to lowercase. The remaining characters are kept as is. This is useful for creating camelCase variable names or when you only want to lowercase the first character.

```typescript
import { lowerFirst } from 'es-toolkit/compat';

lowerFirst('fred'); // 'fred'
lowerFirst('Fred'); // 'fred'
lowerFirst('FRED'); // 'fRED'
lowerFirst(''); // ''
```

Non-string values are also converted to strings before processing.

```typescript
import { lowerFirst } from 'es-toolkit/compat';

lowerFirst(123); // '123'
lowerFirst(null); // ''
lowerFirst(undefined); // ''
```

#### Parameters

- `str` (`string`, optional): The string to convert the first character to lowercase.

#### Returns

(`string`): Returns the string with the first character converted to lowercase.
