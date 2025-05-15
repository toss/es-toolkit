# min

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Finds the element in an array that has the minimum value.

## Signature

```typescript
function min<T>(items: [T, ...T[]]): T;
function min(): undefined;
function min<T>(items?: ArrayLike<T> | null | undefined): T | undefined;
```

### Parameters

- `items` (`ArrayLike<T> | null | undefined`): The array of elements to search.

### Returns

(`T | undefined`): The element with the minimum value, or `undefined` if the array is empty, `null`, or `undefined`.

### Example

```typescript
min([1, 2, 3]); // Returns: 1
min(['a', 'b']); // Returns: 'a'
```
