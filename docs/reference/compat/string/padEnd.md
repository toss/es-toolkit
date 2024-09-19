# padEnd

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Pads the end of a string with a given character until it reaches the specified length.

If the length is less than or equal to the original string's length, or if the padding character is an empty string,
the original string is returned unchanged.

## Signature

```typescript
function padEnd(str: string, length = 0, chars = ' '): string;
```

### Parameters

- `str` (`string`): The string to pad.
- `length` (`number`): The length of the resulting string. Defaults to `0`.
- `char` (`string`): The character to pad the string with. Defaults to `' '`.

### Returns

Returns a new string padded with the specified character until it reaches the specified length.

## Examples

```javascript
padEnd('hello', 10, 'a'); // 'helloaaaaa'
padEnd('hello', 3, 'a'); // 'hello'
padEnd('hello', 5, ''); // 'hello'
```
