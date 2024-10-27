# sumBy

Calculates the sum of an array of numbers when applying the `getValue` function to each element.

If the array is empty, this function returns `0`.

If the `getValue` function returns a `bigint`, the function returns a `bigint` value. But if the array is empty, this function returns `0`.

## Signature

```typescript
function sumBy<T>(items: T[], getValue: (element: T) => number): number;
function sumBy<T>(items: T[], getValue: (element: T) => bigint): bigint | number;
```

### Parameters

- `items` (`T[]`): An array to calculate the sum.
- `getValue` (`(item: T) => number | bigint`): A function that selects a numeric value from each element.

### Returns

(`number | bigint`): The sum of all the numbers as determined by the `getValue` function.

## Examples

```typescript
sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: 6
sumBy([], x => x.a); // Returns: 0
sumBy([{ a: 1n }, { a: 2n }, { a: 3n }], x => x.a); // Returns: 6n
```
