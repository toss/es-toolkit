# first

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns the first element of an array or `undefined` if the array is empty.

This function takes an array and returns the first element of the array.
If the array is empty, the function returns `undefined`.

## Signature

```typescript
function first<T>(arr: ArrayLike<T> | undefined | null): T | undefined;
```

### Parameters

- `arr` (`ArrayLike<T> | undefined | null`): The array from which to get the first element.

### Returns

(`T | undefined`): The first element of the array, or `undefined` if the array is empty.

## Examples

```typescript
const emptyArr: number[] = [];
const noElement = head(emptyArr);
// noElement will be undefined
```
