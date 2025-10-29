# pascalCase

Converts a string to pascal case.

```typescript
const converted = pascalCase(str);
```

## Reference

### `pascalCase(str)`

Use `pascalCase` when you want to convert a string to pascal case. Pascal case is a naming convention where the first letter of each word is capitalized and words are joined without separators.

```typescript
import { pascalCase } from 'es-toolkit/string';

// Basic usage
pascalCase('pascalCase'); // 'PascalCase'
pascalCase('some whitespace'); // 'SomeWhitespace'

// Words connected with hyphens or underscores
pascalCase('hyphen-text'); // 'HyphenText'
pascalCase('snake_case'); // 'SnakeCase'

// Handling consecutive uppercase letters
pascalCase('HTTPRequest'); // 'HttpRequest'
pascalCase('XMLHttpRequest'); // 'XmlHttpRequest'
```

It also correctly handles strings with various separators.

```typescript
import { pascalCase } from 'es-toolkit/string';

// Mixed separators
pascalCase('camelCase-with_mixed.separators'); // 'CamelCaseWithMixedSeparators'

// With numbers
pascalCase('version2.1.0'); // 'Version210'

// With special characters
pascalCase('user@email.com'); // 'UserEmailCom'
```

#### Parameters

- `str` (`string`): The string to convert to pascal case.

#### Returns

(`string`): Returns a new string converted to pascal case.

## Demo

::: sandpack

```ts index.ts
import { pascalCase } from 'es-toolkit/string';

console.log(pascalCase('pascalCase'));
```

:::
