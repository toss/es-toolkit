# startCase

Converts the first letter of each word in a string to uppercase.

```typescript
const converted = startCase(str);
```

## Reference

### `startCase(str)`

Use `startCase` when you want to convert a string to start case (where the first letter of each word is capitalized). It capitalizes the first letter of each word, converts the rest to lowercase, and joins the words with spaces.

```typescript
import { startCase } from 'es-toolkit/string';

// Basic usage
startCase('hello world'); // 'Hello World'
startCase('HELLO WORLD'); // 'Hello World'

// Converting camelCase or PascalCase
startCase('fooBar'); // 'Foo Bar'
startCase('PascalCase'); // 'Pascal Case'

// Words connected with hyphens or underscores
startCase('hello-world'); // 'Hello World'
startCase('hello_world'); // 'Hello World'
```

It also correctly handles strings with various delimiters and special characters.

```typescript
import { startCase } from 'es-toolkit/string';

// Cases with multiple delimiters
startCase('--foo-bar--'); // 'Foo Bar'
startCase('__FOO_BAR__'); // 'Foo Bar'

// Handling consecutive uppercase letters and numbers
startCase('XMLHttpRequest'); // 'Xml Http Request'
startCase('_abc_123_def'); // 'Abc 123 Def'

// Cases with empty strings or only meaningless delimiters
startCase('_-_-_-_'); // ''
startCase('12abc 12ABC'); // '12 Abc 12 ABC'
```

#### Parameters

- `str` (`string`): The string to convert to start case.

#### Returns

(`string`): Returns a new string with the first letter of each word capitalized and joined with spaces.

## Demo

::: sandpack

```ts index.ts
import { startCase } from 'es-toolkit/string';

console.log(startCase('startCase'));
```

:::
