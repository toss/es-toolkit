# lowerCase (Lodash compatibility)

::: warning Use `lowerCase` from `es-toolkit`

This `lowerCase` function operates slower due to handling non-string input values and removing contracted apostrophes.

Instead, use the faster and more modern [lowerCase](../../string/lowerCase.md) from `es-toolkit`.

:::

Converts a string to lowercase words separated by spaces.

```typescript
const result = lowerCase(str);
```

## Usage

### `lowerCase(str)`

Converts a string to lowercase words separated by spaces. Each word is converted to lowercase and connected with space characters. This is useful for creating human-readable text.

```typescript
import { lowerCase } from 'es-toolkit/compat';

lowerCase('camelCase'); // 'camel case'
lowerCase('some whitespace'); // 'some whitespace'
lowerCase('hyphen-text'); // 'hyphen text'
lowerCase('HTTPRequest'); // 'http request'
```

Non-string values are also converted to strings before processing.

```typescript
import { lowerCase } from 'es-toolkit/compat';

lowerCase(123); // '123'
lowerCase(null); // ''
lowerCase(undefined); // ''
```

#### Parameters

- `str` (`string | object`, optional): The value to convert to lowercase format.

#### Returns

(`string`): Returns the string with lowercase words separated by spaces.
