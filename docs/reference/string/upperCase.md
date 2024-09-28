# upperCase

Converts a string to upper case.

Upper case is the naming convention in which each word is written in uppercase and separated by an space ( ) character. For example, `UPPER CASE`.

## Signature

```typescript
function upperCase(str: string): string;
```

### Parameters

- `str` (`string`): The string that is to be changed to upper case.

### Returns

(`string`) The converted string to upper case.

## Examples

```typescript
import { upperCase } from 'es-toolkit/string';

upperCase('camelCase'); // returns 'CAMEL CASE'
upperCase('some whitespace'); // returns 'SOME WHITESPACE'
upperCase('hyphen-text'); // returns 'HYPHEN TEXT'
upperCase('HTTPRequest'); // returns 'HTTP REQUEST'
```
