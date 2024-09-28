# camelCase

Converts a string to camel case.

Camel case is a naming convention in which the first word is in lower case and each subsequent word is capitalized. For example, `camelCase`.

## Signature

```typescript
function camelCase(str: string): string;
```

### Parameters

- `str` (`string`): The string that is to be changed to camel case.

### Returns

(`string`) The converted string to camel case.

## Examples

```typescript
import { camelCase } from 'es-toolkit/string';

camelCase('camelCase'); // returns 'camelCase'
camelCase('some whitespace'); // returns 'someWhitespace'
camelCase('hyphen-text'); // returns 'hyphenText'
camelCase('HTTPRequest'); // returns 'httpRequest'
camelCase('Keep unicode 😅'); // returns 'keepUnicode😅'
```
