# camelCase (Lodash compatibility)

::: warning Use `camelCase` from `es-toolkit`

This `camelCase` function operates slower due to handling non-string input values and removing contracted apostrophes.

Instead, use the faster and more modern [camelCase](../../string/camelCase.md) from `es-toolkit`.

:::

Converts a string to camel case.

```typescript
const result = camelCase(str);
```

## Reference

### `camelCase(str)`

Converts a string to camel case. Camel case is a naming convention where the first word starts with a lowercase letter and subsequent words begin with uppercase letters, all without spaces.

```typescript
import { camelCase } from 'es-toolkit/compat';

camelCase('camelCase'); // 'camelCase'
camelCase('some whitespace'); // 'someWhitespace'
camelCase('hyphen-text'); // 'hyphenText'
camelCase('HTTPRequest'); // 'httpRequest'
```

Non-string values are also converted to strings before processing.

```typescript
import { camelCase } from 'es-toolkit/compat';

camelCase(123); // '123'
camelCase(null); // ''
camelCase(undefined); // ''
```

#### Parameters

- `str` (`string | object`, optional): The value to convert to camel case.

#### Returns

(`string`): Returns the string converted to camel case.
