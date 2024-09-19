# pad

Pads string on the left and right sides if it's shorter than length. Padding characters are truncated if they can't be evenly divided by length.

If the length is less than or equal to the original string's length, or if the padding character is an empty string, the original string is returned unchanged.

## Signature

```typescript
function pad(str: string, length: number, chars = ' '): string;
```

### Parameters

- `str` (`string`): The string to pad.
- `length` (`number`): The length of the resulting string.
- `char` (`string`): The character to pad the string with. Defaults to `' '`.

### Returns

(`string`): Returns the padded string.

## Example

```javascript
pad('abc', 8);
// => '  abc   '

pad('abc', 8, '_-');
// => '_-abc_-_'

pad('abc', 3);
// => 'abc'
```
