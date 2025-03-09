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
const unSortedNumbers = [55, 33, 22, 11, 44];

// Normal case
sortedIndexOf(numbers, 11);
// Return value: 0
// Explanation: The position of the value 11 in the numbers array is 0.

// Non-existent value
sortedIndexOf(numbers, 30);
// Return value: -1
// Explanation: 30 doesn't exist in the array, so it returns -1.

// Empty array
sortedIndexOf([], 30);
// Return value: -1
// Explanation: When searching for a value in an empty array, it returns -1.

// Unsorted array
sortedIndexOf(unSortedNumbers, 11);
// Return value: -1
// Explanation: When using an unsorted array, it returns -1.
```
