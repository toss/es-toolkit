# toLength

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Converts the value to a valid index. A valid index is an integer that is greater than or equal to `0` and less than or equal to `2^32 - 1`.

It converts the given value to a number and floors it to an integer. If the value is less than `0`, it returns `0`. If the value exceeds `2^32 - 1`, it returns `2^32 - 1`.

## Signature

```typescript
function toLength(value?: unknown): number;
```

### Parameters

- `value` (`unknown`): The value to convert to a valid index.

### Returns

(`number`): The converted value.

## Examples

```typescript
toLength(3.2)  // => 3
toLength(-1)   // => 0
toLength(1.9)  // => 1
toLength('42') // => 42
toLength(null) // => 0
```