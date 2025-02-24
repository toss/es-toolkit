# reverseString

Reverses a string.

This function takes a string as input and returns a new string that is the reverse of the input.

## Interface

```typescript
function reverseString(value: string): string;
```

### Parameters

- `value` (`string`): The string to be reversed.

### Returns

(`string`): The reversed string.

## Examples

```typescript
import { reverseString } from 'es-toolkit/string';

const reversedStr1 = reverseString('hello'); // returns 'olleh'
const reversedStr2 = reverseString('PascalCase'); // returns 'esaClaP'
const reversedStr3 = reverseString('foo 😄 bar'); // returns 'rab 😄 oof'
```

## Demo

::: sandpack

```ts index.ts
import { reverseString } from 'es-toolkit/string';

console.log(reverseString('hello'));
```

:::
