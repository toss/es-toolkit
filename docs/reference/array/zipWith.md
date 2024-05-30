# zipWith

Combines multiple arrays into a single array using a custom combiner function.

This function takes multiple arrays and a combiner function, and returns a new array where each element
is the result of applying the combiner function to the corresponding elements of the input arrays.

## Signature

```typescript
function zipWith<T, R>(arr1: T[], combine: (item: T) => R): R[];
function zipWith<T, U, R>(arr1: T[], arr2: U[], combine: (item1: T, item2: U) => R): R[];
function zipWith<T, U, V, R>(arr1: T[], arr2: U[], arr3: V[], combine: (item1: T, item2: U, item3: V) => R): R[];
function zipWith<T, U, V, W, R>(
  arr1: T[],
  arr2: U[],
  arr3: V[],
  arr4: W[],
  combine: (item1: T, item2: U, item3: V, item4: W) => R
): R[];
```

### Parameters

- `arr1` (`T[]`): The first array to zip.
- `arr2` (`U[]`, optional): The second array to zip.
- `arr3` (`V[]`, optional): The third array to zip.
- `arr4` (`W[]`, optional): The fourth array to zip.
- `combine` (`(item1: T, item2: U, item3: V, item4: W) => R`): The combiner function that takes corresponding elements from each array and returns a single value.

### Returns

(`R[]`): A new array where each element is the result of applying the combiner function to the corresponding elements of the input arrays.

## Examples

```typescript
// Example usage with two arrays:
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const result = zipWith(arr1, arr2, (a, b) => a + b);
// result will be [5, 7, 9]

// Example usage with three arrays:
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const result = zipWith(arr1, arr2, arr3, (a, b, c) => `${a}${b}${c}`);
// result will be ['135', '246']
```
