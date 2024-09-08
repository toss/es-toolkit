# flattenDepth

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Flattens an array up to the specified depth.

## Signature

```typescript
function flattenDepth<T, D extends number = 1>(value: T[] | object, depth: D): Array<FlatArray<T[], D>> | [];
```

### Parameters

- `value` (`T[] | object`): The value to flatten.
- `depth` (`D`): The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.

### Returns

(`Array<FlatArray<T[], D>> | []`): A new array that has been flattened.

## Examples

```typescript
const arr = flattenDepth([1, [2, 3], [4, [5, 6]]], 1);
// Returns: [1, 2, 3, 4, [5, 6]]

const arr = flattenDepth([1, [2, 3], [4, [5, 6]]], 2);
// Returns: [1, 2, 3, 4, 5, 6]
```
