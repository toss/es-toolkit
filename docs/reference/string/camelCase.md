# camelCase

Converts a string to camel case.

```typescript
const result = camelCase(str);
```

## Reference

### `camelCase(str)`

Use `camelCase` when you want to convert a string to camel case. Camel case is a naming convention where the first word is lowercase and the first letter of each subsequent word is capitalized.

```typescript
import { camelCase } from 'es-toolkit/string';

// Convert various string formats to camel case
camelCase('hello world'); // returns 'helloWorld'
camelCase('some-hyphen-text'); // returns 'someHyphenText'
camelCase('CONSTANT_CASE'); // returns 'constantCase'
camelCase('PascalCase'); // returns 'pascalCase'
camelCase('mixed   SpAcE'); // returns 'mixedSpace'
```

It converts strings with special characters, spaces, hyphens, and other separators into a format suitable for JavaScript variable names or object property names.

```typescript
import { camelCase } from 'es-toolkit/string';

// Convert keys from API responses
const apiKey = 'user_first_name';
const jsKey = camelCase(apiKey); // 'userFirstName'

// Convert HTML attributes to JavaScript properties
const cssProperty = 'background-color';
const jsProperty = camelCase(cssProperty); // 'backgroundColor'
```

It also preserves Unicode characters.

```typescript
import { camelCase } from 'es-toolkit/string';

camelCase('keep unicode 😅'); // returns 'keepUnicode😅'
camelCase('한글-테스트'); // returns '한글테스트'
```

#### Parameters

- `str` (`string`): The string to convert to camel case.

#### Returns

(`string`): Returns a new string converted to camel case.
