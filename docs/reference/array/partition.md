# partition

Splits an array into two groups based on a predicate function.

This function takes an array and a predicate function. It returns a tuple of two arrays:
the first array contains elements for which the predicate function returns `true`, and
the second array contains elements for which the predicate function returns `false`.

## Signature

```typescript
function partition<T>(arr: T[], isInTruthy: (value: T) => boolean): [truthy: T[], falsy: T[]];
```

### Parameters

- `arr` (`T[]`): The array to partition.
- `isInTruthy` (`(value: T) => boolean`): A predicate function that determines whether an element should be placed in the truthy array. The function is called with each element of the array.

### Returns

(`[T[], T[]]`): A tuple containing two arrays: the first array contains elements for which the predicate returned `true`, and the second array contains elements for which the predicate returned `false`.

## Examples

```typescript
const array = [1, 2, 3, 4, 5];
const isEven = x => x % 2 === 0;
const [even, odd] = partition(array, isEven);
// even will be [2, 4], and odd will be [1, 3, 5]
```
