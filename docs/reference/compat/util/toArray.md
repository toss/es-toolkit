# toArray

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Converts value into an array.

## Signature

```typescript
function toArray(value?: unknown): any[];
```

### Parameters

- `value` (`unknown`): The value to convert.

### Returns

(`any[]`): Returns the converted array.

## Examples

```typescript
toArray({ a: 1, b: 2 }); // returns [1, 2]
toArray('abc'); // returns ['a', 'b', 'c']
toArray(1); // returns []
toArray(null); // returns []
```
