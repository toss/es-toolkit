# trim

Removes leading and trailing whitespace or specified characters from a string.

## Signature

```typescript
function trim(str: string, chars?: string | string[]): string;
```

### Parameters

- `str` (`string`): The string from which characters will be trimmed.
- `chars` (`string | string[]`): The character(s) to remove from the string. Can be a single character or an array of characters.

### Returns

(`string`): The resulting string after the specified characters have been removed.

## Examples

```typescript
trim('  hello  '); // "hello"
trim('--hello--', '-'); // "hello"
trim('##hello##', ['#', 'o']); // "hell"
```
