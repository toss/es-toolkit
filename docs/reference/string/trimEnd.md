# trimEnd

Removes whitespace or specified characters from the end of a string.

```typescript
const trimmed = trimEnd(str, chars);
```

## Reference

### `trimEnd(str, chars?)`

Use `trimEnd` when you want to remove unnecessary characters from the end of a string. If no specific characters are specified, it removes whitespace characters.

```typescript
import { trimEnd } from 'es-toolkit/string';

// Basic whitespace removal
trimEnd('hello  '); // 'hello'
trimEnd('hello\t\n  '); // 'hello'

// Removing specific characters
trimEnd('hello---', '-'); // 'hello'
trimEnd('123000', '0'); // '123'
trimEnd('abcabcabc', 'c'); // 'abcabcab'
```

When you specify multiple characters as an array, all characters that match any of them will be removed.

```typescript
import { trimEnd } from 'es-toolkit/string';

// Specifying multiple characters as an array
trimEnd('hello!!@@', ['!', '@']); // 'hello'

// Removing numbers and special characters
trimEnd('abc123', ['1', '2', '3']); // 'abc'

// Removing characters and whitespace together
trimEnd('hello__  ', ['_', ' ']); // 'hello'
```

#### Parameters

- `str` (`string`): The string from which to remove characters from the end.
- `chars` (`string | string[]`, optional): The characters to remove. Can be a string or an array of characters. Defaults to whitespace characters.

#### Returns

(`string`): Returns a new string with the specified characters removed from the end.

#### Errors

Throws an error if `chars` is a string with a length other than 1.
