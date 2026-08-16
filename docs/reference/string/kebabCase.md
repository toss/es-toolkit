# kebabCase

Converts a string to kebab case.

```typescript
const result = kebabCase(str);
```

## Usage

### `kebabCase(str)`

Use `kebabCase` when you want to convert a string to kebab case. Kebab case is a naming convention where each word is written in lowercase and connected with dashes (-).

```typescript
import { kebabCase } from 'es-toolkit/string';

// Convert camel case to kebab case
kebabCase('camelCase');
// Result: 'camel-case'

// Convert a string with whitespace
kebabCase('some whitespace');
// Result: 'some-whitespace'

// Keep strings that are already in kebab case as is
kebabCase('hyphen-text');
// Result: 'hyphen-text'

// Convert strings with uppercase letters
kebabCase('HTTPRequest');
// Result: 'http-request'
```

This function is useful when creating API endpoints, CSS class names, HTML attributes, etc.

#### Parameters

- `str` (`string`): The string to convert to kebab case.

#### Returns

(`string`): The string converted to kebab case.
