# sortedIndexOf

::: info
This function can only be imported from `es-toolkit/compat` for compatibility reasons. This is because there are native JavaScript APIs that can replace it, or it hasn't been sufficiently optimized yet.

When you import this function from `es-toolkit/compat`, it [behaves exactly the same as lodash](../../../compatibility.md).
:::

Finds the index of the first occurrence of a value in a sorted array, similar to how `Array#indexOf` works, but specifically for sorted arrays.

::: warning Ensure the array is sorted

It's important to provide a sorted array to this function because it uses a binary search to quickly find the index.

:::

## Interface

```typescript
export function sortedIndexOf(array: ArrayLike | null | undefined, value: T): number;
```

### Parameters

- `array` (`ArrayLike | null | undefined`): A sorted array. If the array is null or undefined, it returns -1.
- `value` (`T`): The value to search for in the sorted array through comparison.

### Returns

(`number`): The index at which the value should be inserted to maintain the sort order.

## Examples

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

const numbers = [11, 22, 33, 44, 55];
sortedIndexOf(numbers, 11); // Return value: 0
sortedIndexOf(numbers, 30); // Return value: -1

// If the value is duplicated, it returns the first index of the value.
const duplicateNumbers = [1, 2, 2, 3, 3, 3, 4];
sortedIndexOf(duplicateNumbers, 3); // Return value: 3

// If the array is unsorted, it can return the wrong index.
const unSortedArray = [55, 33, 22, 11, 44];
sortedIndexOf(unSortedArray, 11); // Return value: -1

// -0 and 0 are treated the same
const mixedZeroArray = [-0, 0];
sortedIndexOf(mixedZeroArray, 0); // Return value: 0
sortedIndexOf(mixedZeroArray, -0); // Return value: 0

// It works with array-like objects
const arrayLike = { length: 3, 0: 10, 1: 20, 2: 30 };
sortedIndexOf(arrayLike, 20); // Return value: 1
```
