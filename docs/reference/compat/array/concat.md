# concat

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Concatenates multiple arrays and values into a single array.

## Signature

```typescript
function concat<T>(...values: Array<T | T[]>): T[];
```

### Parameters

- `values` (`...(T | T[])`): The values and/or arrays to concatenate.

### Returns

(`T[]`): A new array containing all the input values.

### Example

```typescript
// Concatenate individual values
concat(1, 2, 3);
// returns [1, 2, 3]

// Concatenate arrays of values
concat([1, 2], [3, 4]);
// returns [1, 2, 3, 4]

// Concatenate a mix of individual values and arrays
concat(1, [2, 3], 4);
// returns [1, 2, 3, 4]

// Concatenate nested arrays
concat([1, [2, 3]], 4);
// returns [1, [2, 3], 4]
```
