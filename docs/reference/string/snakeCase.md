# snakeCase

Converts a string to snake case.

Snake case is the naming convention in which each word is written in lowercase and separated by an underscore (\_) character. For example, `snake_case`.

## Signature

```typescript
function snakeCase(str: string): string;
```

### Parameters

- `str` (`string`): The string that is to be changed to snake case.

### Returns

(`string`) The converted string to snake case.

## Examples

```typescript
import { snakeCase } from 'es-toolkit/string';

snakeCase('camelCase'); // returns 'camel_case'
snakeCase('some whitespace'); // returns 'some_whitespace'
snakeCase('hyphen-text'); // returns 'hyphen_text'
snakeCase('HTTPRequest'); // returns 'http_request'
```
