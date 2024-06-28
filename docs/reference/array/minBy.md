# minBy

Finds the element in an array that has the minimum value when applying the `getValue` function to each element.

If the list is empty, returns `undefined`.

## Signature

```typescript
function minBy<T>(items: T[], getValue: (item: T) => number): T;
```

### Parameters

- `items` (`T[]`): The array of elements to search.
- `getValue` (`(item: T) => number`): A function that selects a numeric value from each element.

### Returns

The element with the minimum value as determined by the `getValue` function.

### Example

```typescript
minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 3 }
minBy([], x => x.a); // Returns: undefined
```
