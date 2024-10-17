# medianBy

Calculates the median of an array of elements when applying the `getValue` function to each element.

If the array is empty, this function returns `NaN`.
If the array has an odd number of elements, it returns the middle element.
If the array has an even number of elements, it returns the average of the two middle elements.

## Signature

```typescript
export function medianBy<T>(items: readonly T[], getValue: (element: T) => number): number;
```

### Parameters

- `items` (`readonly T[]`): An array to calculate the median.
- `getValue` (`(element: T) => number`): A function that selects a numeric value from each element.

### Returns

(`number`): The median of all the numbers as determined by the `getValue` function.

## Examples

```typescript
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], x => x.a); // Returns: 3
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }], x => x.a); // Returns: 2.5
medianBy([], x => x.a); // Returns: NaN
```