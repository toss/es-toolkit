# min

::: info
This function is fully compatible with lodash. You can find it in our [compatibility library](../../../compatibility.md), `es-toolkit/compat`.
:::

Finds the element in an array that has the minimum value.

If the list is empty, returns `undefined`.

## Signature

```typescript
function min<T>(items: [T, ...T[]]): T;
function min(): undefined;
function min<T>(items?: T[]): T | undefined;
```

### Parameters

- `items` (`T[]`): The array of elements to search.

### Returns

(`T`): The element with the minimum value.

### Example

```typescript
min([1, 2, 3]); // Returns: 1
min(['a', 'b']); // Returns: 'a'
```
