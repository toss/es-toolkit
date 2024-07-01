# meanBy

Calculates the average of an array of numbers when applying the `getValue` function to each element.

If the array is empty, this function returns `NaN`.

## Signature

```typescript
export function meanBy<T>(items: T[], getValue: (element: T) => number): number;
```

### Parameters

- `items` (`T[]`): An array to calculate the average.
- `getValue` (`(item: T) => number`): A function that selects a numeric value from each element.

### Returns

(`number`): The average of all the numbers as determined by the `getValue` function.

## Examples

```typescript
meanBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: 2
meanBy([], x => x.a); // Returns: NaN
```
