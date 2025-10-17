# trim

Removes whitespace or specified characters from the beginning and end of a string.

```typescript
const trimmed = trim(str, chars);
```

## Reference

### `trim(str, chars?)`

Use `trim` when you want to remove unnecessary characters from the start and end of a string. If no specific characters are specified, it removes whitespace characters.

```typescript
import { trim } from 'es-toolkit/string';

// Basic whitespace removal
trim('  hello  '); // 'hello'
trim('\t\n  hello  \r\n'); // 'hello'

// Removing specific characters
trim('--hello--', '-'); // 'hello'
trim('***hello***', '*'); // 'hello'

// Removing if any of multiple characters match
trim('##hello##world##', ['#', 'd']); // 'hello##worl'
```

When you specify multiple characters as an array, all characters that match any of them are removed.

```typescript
import { trim } from 'es-toolkit/string';

// Specifying multiple characters as an array
trim('!!@@hello@@!!', ['!', '@']); // 'hello'

// Removing numbers and special characters
trim('123abc123', ['1', '2', '3']); // 'abc'

// Removing characters and spaces together
trim('  __hello__  ', ['_', ' ']); // 'hello'
```

#### Parameters

- `str` (`string`): The string to remove characters from the beginning and end.
- `chars` (`string | string[]`, optional): The characters to remove. Can use a string or character array. Defaults to whitespace characters.

#### Returns

(`string`): Returns a new string with the specified characters removed from the beginning and end.
