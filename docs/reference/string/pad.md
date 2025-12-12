# pad

Pads a string on both sides to reach a specified length.

```typescript
const padded = pad(str, length, chars);
```

## Usage

### `pad(str, length, chars?)`

Use `pad` when you want to pad both sides of a string with characters to match a specified length when the string is shorter than the target length. If the padding cannot be evenly distributed on both sides, the right side will have one more character.

```typescript
import { pad } from 'es-toolkit/string';

// Padding with default whitespace
pad('abc', 8);
// => '  abc   '

// Padding with custom characters
pad('abc', 8, '_-');
// => '_-abc_-_'

// When the string is already longer than or equal to the target length
pad('abc', 3);
// => 'abc'

pad('abcdef', 3);
// => 'abcdef'
```

When padding characters cannot be evenly distributed to the target length, the right side will be longer.

```typescript
import { pad } from 'es-toolkit/string';

pad('abc', 9, '123');
// => '123abc123' (left 3 characters, right 3 characters)

pad('abc', 10, '123');
// => '123abc1231' (left 3 characters, right 4 characters)
```

#### Parameters

- `str` (`string`): The string to pad.
- `length` (`number`): The target length.
- `chars` (`string`, optional): The characters to use for padding. Defaults to `' '`.

#### Returns

(`string`): Returns the padded string.
