# repeat

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns the given string repeated a specified number of times.

If the string is empty or the count is `0`, it returns an empty string.

## Signature

```typescript
function repeat(str: string, n: number): string;
```

### Parameters

- `str` (`string`): The string to repeat.
- `n` (`number`): The number of times you want to repeat.

### Returns

(`string`): The string repeated for the nth time.

## Examples

```javascript
repeat('abc', 0); // ''
repeat('abc', 2); // 'abcabc'
```
