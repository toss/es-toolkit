# max

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Finds the element in an array that has the maximum value.

If the list is empty, returns `undefined`.

## Signature

```typescript
function max<T>(items: [T, ...T[]]): T;
function max(): undefined;
function max<T>(items?: T[]): T | undefined;
```

### Parameters

- `items` (`T[]`): The array of elements to search.

### Returns

(`T`): The element with the maximum value.

### Example

```typescript
max([1, 2, 3]); // Returns: 3
max(['a', 'b']); // Returns: 'b'
```
