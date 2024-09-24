# constantCase

Converts a string to constant case.

Constant case is a naming convention where each word is written in uppercase letters and separated by an underscore (`_`). For example, `CONSTANT_CASE`.

## Signature

```typescript
function constantCase(str: string): string;
```

### Parameters

- `str` (`string`): The string to convert to constant case.

### Returns

(`string`) The converted constant case string.

## Examples

```typescript
import { constantCase } from 'es-toolkit/string';

constantCase('camelCase'); // returns 'CAMEL_CASE'
constantCase('some whitespace'); // returns 'SOME_WHITESPACE'
constantCase('hyphen-text'); // returns 'HYPHEN_TEXT'
constantCase('HTTPRequest'); // returns 'HTTP_REQUEST'
```
