# pascalCase

Converts a string to Pascal case.

Pascal case is the naming convention in which each word is capitalized and concatenated without any separator characters. For example, `PascalCase`.

## Signature

```typescript
function pascalCase(str: string): string;
```

### Parameters

- `str` (`string`): The string that is to be changed to Pascal case.

### Returns

(`string`) The converted string to Pascal case.

## Examples

```typescript
import { pascalCase } from 'es-toolkit/string';

const convertedStr1 = pascalCase('pascalCase'); // returns 'PascalCase'
const convertedStr2 = pascalCase('some whitespace'); // returns 'SomeWhitespace'
const convertedStr3 = pascalCase('hyphen-text'); // returns 'HyphenText'
const convertedStr4 = pascalCase('HTTPRequest'); // returns 'HttpRequest'
```

## Demo

::: sandpack

```ts index.ts
import { pascalCase } from 'es-toolkit/string';

console.log(pascalCase('pascalCase'));
```

:::
