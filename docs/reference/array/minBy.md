# minBy

Finds the element in an array that has the minimum value when applying the `getValue` function to each element.

## Signature

```typescript
function minBy<T>(items: [T, ...T[]], getValue: (element: T) => number): T;
function minBy<T>(items: T[], getValue: (element: T) => number): T | undefined;
```

### Parameters

- `items` (`T[]`): The array of elements to search.
- `getValue` (`(item: T) => number`): A function that selects a numeric value from each element.

### Returns

(`T`): The element with the minimum value as determined by the `getValue` function.

## Example

```typescript
minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 1 }
minBy([], x => x.a); // Returns: undefined
```
