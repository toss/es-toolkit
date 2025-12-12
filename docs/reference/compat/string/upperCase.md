# upperCase (Lodash Compatibility)

::: warning Use `upperCase` from `es-toolkit`

This `upperCase` function operates slowly due to normalization logic for handling `null` or `undefined`.

Use the faster and more modern [upperCase](../../string/upperCase.md) from `es-toolkit` instead.

:::

Converts a string to upper case.

```typescript
const upperCased = upperCase(str);
```

## Usage

### `upperCase(str)`

Use `upperCase` when you want to convert a string to upper case (UPPER CASE). Upper case is a naming convention where each word is written in uppercase and connected with spaces.

```typescript
import { upperCase } from 'es-toolkit/compat';

// Convert camel case
upperCase('camelCase');
// Returns: 'CAMEL CASE'

// Convert space-separated string
upperCase('some whitespace');
// Returns: 'SOME WHITESPACE'

// Convert hyphen-separated string
upperCase('hyphen-text');
// Returns: 'HYPHEN TEXT'

// When uppercase letters appear consecutively
upperCase('HTTPRequest');
// Returns: 'HTTP REQUEST'
```

`null` or `undefined` is treated as an empty string.

```typescript
import { upperCase } from 'es-toolkit/compat';

upperCase(null); // ''
upperCase(undefined); // ''
```

#### Parameters

- `str` (`string`, optional): The string to convert to upper case.

#### Returns

(`string`): Returns the string converted to upper case.
