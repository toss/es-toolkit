# sentenceCase

Converts a string to sentence case.

```typescript
const converted = sentenceCase(str);
```

## Usage

### `sentenceCase(str)`

Use `sentenceCase` when you want to convert a string to sentence case. Sentence case is a naming convention where the first letter of the first word is capitalized, all other letters are lowercase, and words are separated by spaces.

```typescript
import { sentenceCase } from 'es-toolkit/string';

// Basic usage
sentenceCase('hello world'); // 'Hello world'
sentenceCase('HELLO WORLD'); // 'Hello world'

// Converting camelCase or PascalCase
sentenceCase('fooBar'); // 'Foo bar'
sentenceCase('PascalCase'); // 'Pascal case'

// Words connected with hyphens or underscores
sentenceCase('hello-world'); // 'Hello world'
sentenceCase('hello_world'); // 'Hello world'
```

It's useful when turning identifiers such as field names or enum values into human-readable labels.

```typescript
import { sentenceCase } from 'es-toolkit/string';

sentenceCase('firstName'); // 'First name'
sentenceCase('MAX_RETRY_COUNT'); // 'Max retry count'
sentenceCase('user-profile-settings'); // 'User profile settings'
```

It also correctly handles strings with various delimiters and special characters.

```typescript
import { sentenceCase } from 'es-toolkit/string';

// Cases with multiple delimiters
sentenceCase('--foo-bar--'); // 'Foo bar'
sentenceCase('__FOO_BAR__'); // 'Foo bar'

// Handling consecutive uppercase letters and numbers
sentenceCase('XMLHttpRequest'); // 'Xml http request'
sentenceCase('_abc_123_def'); // 'Abc 123 def'

// Cases with empty strings or only meaningless delimiters
sentenceCase('_-_-_-_'); // ''
sentenceCase('12abc 12ABC'); // '12 abc 12 abc'
```

#### Parameters

- `str` (`string`): The string to convert to sentence case.

#### Returns

(`string`): Returns a new string with the first letter of the first word capitalized, the rest in lowercase, and words joined with spaces.

## Try It

::: sandpack

```ts index.ts
import { sentenceCase } from 'es-toolkit/string';

console.log(sentenceCase('sentenceCase'));
```

:::
