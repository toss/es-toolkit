# snakeCase (Lodash compatibility)

::: warning Use `snakeCase` from `es-toolkit`

This `snakeCase` function operates slowly due to normalization logic for handling `null` or `undefined`.

Instead, use the faster and more modern [snakeCase](../../string/snakeCase.md) from `es-toolkit`.

:::

Converts a string to snake case.

```typescript
const snakeCased = snakeCase(str);
```

## Usage

### `snakeCase(str)`

Use `snakeCase` when you want to convert a string to snake*case. Snake case is a naming convention where each word is written in lowercase and connected with underscores (*).

```typescript
import { snakeCase } from 'es-toolkit/compat';

// Convert camel case
snakeCase('camelCase');
// Returns: 'camel_case'

// Convert space-separated string
snakeCase('some whitespace');
// Returns: 'some_whitespace'

// Convert hyphen-separated string
snakeCase('hyphen-text');
// Returns: 'hyphen_text'

// Handle consecutive uppercase letters
snakeCase('HTTPRequest');
// Returns: 'http_request'
```

`null` or `undefined` are treated as empty strings.

```typescript
import { snakeCase } from 'es-toolkit/compat';

snakeCase(null); // ''
snakeCase(undefined); // ''
```

#### Parameters

- `str` (`string`, optional): The string to convert to snake case.

#### Returns

(`string`): Returns the converted string in snake case.
