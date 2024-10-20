# medianBy

Calculates the median of an array of elements when applying the `getValue` function to each element.

The [median](./median.md) is the middle value of a sorted array.
If the array has an odd number of elements, the median is the middle value.
If the array has an even number of elements, it returns the average of the two middle values.

If the array is empty, this function returns `NaN`.

## Signature

```typescript
export function medianBy<T>(items: T[], getValue: (element: T) => number): number;
```

### Parameters

- `items` (`T[]`): An array to calculate the median.
- `getValue` (`(element: T) => number`): A function that selects a numeric value from each element.

### Returns

(`number`): The median of all the numbers as determined by the `getValue` function.

## Examples

```typescript
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], x => x.a); // Returns: 3
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }], x => x.a); // Returns: 2.5
medianBy([], x => x.a); // Returns: NaN
```
