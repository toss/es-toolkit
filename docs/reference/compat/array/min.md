# min

Finds the element in an array that has the minimum value.

If the list is empty, returns `undefined`.

## Signature

```typescript
function min<T>(items: T[]): T;
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
