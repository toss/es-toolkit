# lowerCase

Converts a string to lower case.

Lower case is the naming convention in which each word is written in lowercase and separated by an space ( ) character. For example, `lower case`.

## Signature

```typescript
function lowerCase(str: string): string;
```

### Parameters

- `str` (`string`): The string that is to be changed to lower case.

### Returns

(`string`) The converted string to lower case.

## Examples

```typescript
import { lowerCase } from 'es-toolkit/string';

lowerCase('camelCase'); // returns 'camel case'
lowerCase('some whitespace'); // returns 'some whitespace'
lowerCase('hyphen-text'); // returns 'hyphen text'
lowerCase('HTTPRequest'); // returns 'http request'
```
