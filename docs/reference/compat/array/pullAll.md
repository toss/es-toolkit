# pullAll

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Removes all specified values from an array.

This function changes `arr` in place.
If you want to remove values without modifying the original array, use `difference`.

## Signature

```typescript
function pullAll<T>(arr: T[], valuesToRemove: ArrayLike<T>): T[];
```

### Parameters

- `arr` (`T[]`): The array to modify.
- `valuesToRemove` (`ArrayLike<T>`): The values to remove from the array.

### Returns

(`T[]`): The modified array with the specified values removed.

## Examples

```typescript
const numbers = [1, 2, 3, 4, 5, 2, 4];
pullAll(numbers, [2, 4]);
console.log(numbers); // [1, 3, 5]
```
