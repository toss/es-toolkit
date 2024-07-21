# max

::: info
This function is fully compatible with lodash. You can find it in our [compatibility library](../../../compatibility.md), `es-toolkit/compat`.
:::

Finds the element in an array that has the maximum value.

If the list is empty, returns `undefined`.

## Signature

```typescript
function max<T>(items: readonly [T, ...T[]]): T;
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
