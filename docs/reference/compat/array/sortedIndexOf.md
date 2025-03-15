# sortedIndexOf

::: info
This function can only be imported from `es-toolkit/compat` for compatibility reasons. This is because there are native JavaScript APIs that can replace it, or it hasn't been sufficiently optimized yet.

When you import this function from `es-toolkit/compat`, it [behaves exactly the same as lodash](../../../compatibility.md).
:::

This function finds the index of the first occurrence of the second argument value in a sorted array. In other words, it tells you at which position the value you're looking for is located in the sorted array. It uses the [sortedIndex](./sortedIndex.md) function, repeatedly comparing and returning the index.

## Interface

```typescript
export function sortedIndexOf(array: ArrayLike | null | undefined, value: T): number;
```

### Parameters

- `array` (`ArrayLike | null | undefined`): A sorted array. If the array is null or undefined, it returns -1.
- `value` (`T`): The value to search for in the sorted array through comparison.

### Return Value

(`number`): The index at which the value should be inserted to maintain the sort order.

## Examples

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

const numbers = [11, 22, 33, 44, 55];
const unSortedArray = [55, 33, 22, 11, 44];
const duplicateArray = [1, 2, 2, 3, 3, 3, 4];
const emptyArray = [];
const zeroMinusArray = [-0];
const zeroPlusArray = [0];
const floatingArray = [1.1, 2.2, 3.3];
const arrayLike = { length: 3, 0: 10, 1: 20, 2: 30 };

// Normal case
sortedIndexOf(numbers, 11);
// Return value: 0
// Explanation: The position of the value 11 in the numbers array is 0.

// Duplicate values
sortedIndexOf(duplicateArray, 3);
// Return value: 3
// Explanation: The first occurrence index of value 3 is 3.

// Non-existent value
sortedIndexOf(numbers, 30);
// Return value: -1
// Explanation: 30 doesn't exist in the array, so it returns -1.

// Over-arguments value
sortedIndexOf(numbers, 22, true);
// Return value: 1
// Explanation: If you add more factors, it will be ignored.

// Floating value
sortedIndexOf(floatingArray, 2.2);
// Return value: 1
// Explanation: The position of the value 2.2 in the numbers array is 1.

// Empty array
sortedIndexOf(emptyArray, 30);
// Return value: -1
// Explanation: When searching for a value in an empty array, it returns -1.

// Empty array with undefined
sortedIndexOf(emptyArray, undefined);
// Return value: -1
// Explanation: When searching for a value in an empty array, it always returns -1 even it is undefined.

// Unsorted array
sortedIndexOf(unSortedArray, 11);
// Return value: -1
// Explanation: When using an unsorted array, it returns -1.

// -0 and 0 are treated the same
sortedIndexOf(zeroMinusArray, 0);
// Return value: 0
// Explanation: In JavaScript, -0 and 0 are treated as equal.

// -0 and 0 are treated the same
sortedIndexOf(zeroPlusArray, -0);
// Return value: 0
// Explanation: In JavaScript, -0 and 0 are treated as equal.

// Array-like objects
sortedIndexOf(arrayLike, 20);
// Return value: 1
// Explanation: Works with array-like objects too.
```
