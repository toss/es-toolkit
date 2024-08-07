# concat

::: info
This function is fully compatible with lodash. You can find it in our [compatibility library](../../../compatibility.md), `es-toolkit/compat`.
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
