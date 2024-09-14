# trimEnd

Removes trailing whitespace or specified characters from a string.

## Signature

```typescript
function trimEnd(str: string, chars?: string | string[]): string;
```

### Parameters

- `str` (`string`): The string from which trailing characters will be trimmed.
- `chars` (`string | string[]`): The character(s) to remove from the end of the string.

### Returns

(`string`): The resulting string after the specified trailing character has been removed.

## Examples

```typescript
const trimmedStr1 = trimEnd('hello---', '-'); // returns 'hello'
const trimmedStr2 = trimEnd('123000', '0'); // returns '123'
const trimmedStr3 = trimEnd('abcabcabc', 'c'); // returns 'abcabcab'
const trimmedStr4 = trimEnd('trimmedxxx', 'x'); // returns 'trimmed'
```
