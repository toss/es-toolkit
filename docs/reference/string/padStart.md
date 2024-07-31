# padStart

Pads the start of a string with a given character until it reaches the specified length.
If the length is less than or equal to the original string's length, or if the padding character is an empty string,
the original string is returned unchanged.

## Signature

```typescript
function padStart<T extends string>(str: T, length = 0, chars = ' '): string;
```

## Parameters

- `str`: the string to pad
- `length`: the length of the resulting string
- `char`: the character to pad the string with

## Returns

Returns a new string padded with the specified character until it reaches the specified length.

## Examples

```javascript
padStart('hello', 10, 'a'); // 'aaaaahello'
padStart('hello', 3, 'a'); // 'hello'
padStart('hello', 5, ''); // 'hello'
```
