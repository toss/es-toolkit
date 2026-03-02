# reverseString

Reverses a string.

```typescript
const reversed = reverseString(value);
```

## Usage

### `reverseString(value)`

Use `reverseString` when you want to reverse the order of characters in a string. It correctly handles Unicode characters and emojis.

```typescript
import { reverseString } from 'es-toolkit/string';

// Basic string reversal
reverseString('hello'); // 'olleh'
reverseString('world'); // 'dlrow'

// Mixed case strings
reverseString('PascalCase'); // 'esaClacsaP'

// Strings with spaces
reverseString('hello world'); // 'dlrow olleh'
```

It accurately handles emojis and special characters.

```typescript
import { reverseString } from 'es-toolkit/string';

// Strings with emojis
reverseString('foo 😄 bar'); // 'rab 😄 oof'
reverseString('안녕하세요'); // '요세하녕안'

// Numbers and special characters
reverseString('12345'); // '54321'
reverseString('a-b-c'); // 'c-b-a'
```

#### Parameters

- `value` (`string`): The string to reverse.

#### Returns

(`string`): Returns a new string with the characters in reverse order.

## Demo

::: sandpack

```ts index.ts
import { reverseString } from 'es-toolkit';

console.log(reverseString('hello'));
```

:::
