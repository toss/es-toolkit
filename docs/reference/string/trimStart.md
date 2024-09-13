# trimStart

Removes leading whitespace or specified characters from a string.

## Signature

```typescript
function trimStart(str: string, chars?: string | string[]): string;
```

### Parameters

- `str` (`string`): The string from which leading characters will be trimmed.
- `chars` (`string | string[]`): The character(s) to remove from the end of the string.

### Returns

(`string`): The resulting string after the specified leading character has been removed.

## Examples

```typescript
const trimmedStr1 = trimStart('---hello', '-'); // returns 'hello'
const trimmedStr2 = trimStart('000123', '0'); // returns '123'
const trimmedStr3 = trimStart('abcabcabc', 'a'); // returns 'bcabcabc'
const trimmedStr4 = trimStart('xxxtrimmed', 'x'); // returns 'trimmed'
```
