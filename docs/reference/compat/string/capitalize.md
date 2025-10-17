# capitalize (Lodash compatibility)

::: warning Use `capitalize` from `es-toolkit`

This `capitalize` function operates slower due to handling non-string input values.

Instead, use the faster and more modern [capitalize](../../string/capitalize.md) from `es-toolkit`.

:::

Converts the first character of a string to uppercase and the remaining characters to lowercase.

```typescript
const result = capitalize(str);
```

## Reference

### `capitalize(str)`

Converts the first character of a string to uppercase and the remaining characters to lowercase. This is useful for making the first impression of a word better or formatting it as a title.

```typescript
import { capitalize } from 'es-toolkit/compat';

capitalize('fred'); // 'Fred'
capitalize('FRED'); // 'Fred'
capitalize('fRED'); // 'Fred'
```

Empty strings and non-string values can also be handled.

```typescript
import { capitalize } from 'es-toolkit/compat';

capitalize(''); // ''
capitalize(123); // '123'
capitalize(null); // ''
capitalize(undefined); // ''
```

#### Parameters

- `str` (`string`, optional): The string to capitalize.

#### Returns

(`string`): Returns the string with the first character capitalized and the remaining characters in lowercase.
