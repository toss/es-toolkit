# maxBy

Finds the element in an array that has the maximum value when applying the `getValue` function to each element.

## Signature

```typescript
function maxBy<T>(items: [T, ...T[]], getValue: (element: T) => number): T;
function maxBy<T>(items: T[], getValue: (element: T) => number): T | undefined;
```

### Parameters

- `items` (`T[]`): The array of elements to search.
- `getValue` (`(item: T) => number`): A function that selects a numeric value from each element.

### Returns

(`T`): The element with the maximum value as determined by the `getValue` function.

## Example

```typescript
maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 3 }
maxBy([], x => x.a); // Returns: undefined
maxBy(
  [
    { name: 'john', age: 30 },
    { name: 'jane', age: 28 },
    { name: 'joe', age: 26 },
  ],
  x => x.age
); // Returns: { name: 'john', age: 30 }
```
