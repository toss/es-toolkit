# trimStart

Removes whitespace or specified characters from the start of a string.

```typescript
const trimmed = trimStart(str, chars);
```

## Reference

### `trimStart(str, chars?)`

Use `trimStart` when you want to remove unnecessary characters from the beginning of a string. If no specific characters are specified, it removes whitespace characters.

```typescript
import { trimStart } from 'es-toolkit/string';

// Remove default whitespace
trimStart('  hello'); // 'hello'
trimStart('\t\n  hello'); // 'hello'

// Remove specific characters
trimStart('---hello', '-'); // 'hello'
trimStart('000123', '0'); // '123'
trimStart('abcabcabc', 'a'); // 'bcabcabc'
```

If you specify multiple characters as an array, all characters matching any of them will be removed.

```typescript
import { trimStart } from 'es-toolkit/string';

// Specify multiple characters as an array
trimStart('!!@@hello', ['!', '@']); // 'hello'

// Remove numbers and special characters
trimStart('123abc', ['1', '2', '3']); // 'abc'

// Remove characters and whitespace together
trimStart('  __hello', ['_', ' ']); // 'hello'
```

#### Parameters

- `str` (`string`): The string to remove characters from the start.
- `chars` (`string | string[]`, optional): The characters to remove. Can be a string or an array of characters. Defaults to whitespace characters.

#### Returns

(`string`): Returns a new string with the specified characters removed from the start.
