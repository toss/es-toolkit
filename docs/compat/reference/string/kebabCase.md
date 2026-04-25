# kebabCase (Lodash compatibility)

::: warning Use `kebabCase` from `es-toolkit`

This `kebabCase` function operates slower due to handling non-string input values and removing contracted apostrophes.

Instead, use the faster and more modern [kebabCase](../../string/kebabCase.md) from `es-toolkit`.

:::

Converts a string to kebab case.

```typescript
const result = kebabCase(str);
```

## Usage

### `kebabCase(str)`

Converts a string to kebab case. Kebab case is a naming convention where each word is written in lowercase and connected with a dash (-) character. It's commonly used in URLs and CSS class names.

```typescript
import { kebabCase } from 'es-toolkit/compat';

kebabCase('camelCase'); // 'camel-case'
kebabCase('some whitespace'); // 'some-whitespace'
kebabCase('hyphen-text'); // 'hyphen-text'
kebabCase('HTTPRequest'); // 'http-request'
```

Non-string values are also converted to strings before processing.

```typescript
import { kebabCase } from 'es-toolkit/compat';

kebabCase(123); // '123'
kebabCase(null); // ''
kebabCase(undefined); // ''
```

#### Parameters

- `str` (`string | object`, optional): The value to convert to kebab case.

#### Returns

(`string`): Returns the string converted to kebab case.
