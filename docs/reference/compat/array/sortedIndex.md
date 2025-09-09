# sortedIndex

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Finds the lowest index at which a given value should be inserted into a sorted array to maintain its sort order.

- If the array is already sorted, sortedIndex ensures that the new value is inserted in the correct position without disrupting the order.
- The search is performed using a binary search algorithm, making it efficient for large arrays.
- For more complex or custom sorting logic, it delegates to [sortedIndexBy](./sortedIndexBy.md), which allows specifying an iteratee function to customize how elements are compared.

The function returns the index at which the value should be inserted. If the value already exists in the array, the returned index will be before the first occurrence of the value.

## Signature

```typescript
function sortedIndex<T>(array: ArrayLike<T> | null | undefined, value: T): number;
```

### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The sorted array to inspect. Can be null or undefined, in which case it is treated as an empty array.
- `value` (`T`): The value to evaluate and find the appropriate index for insertion

### Returns

(`number`): The index at which the value should be inserted to maintain the sort order.

## Examples

```typescript
import { sortedIndex } from 'es-toolkit/compat';

// Basic usage with a number array
sortedIndex([10, 20, 30, 50], 40);
// Return value: 3
// Explanation: 40 returns index 3 to maintain the sort order.

// Handling an empty or null array
sortedIndex(null, 25);
// Return value: 0
// Explanation: Null or undefined arrays are treated as empty, so 0 is returned.

// Using default comparison logic (delegated behavior with sortedIndexBy)
sortedIndex([10, '20', 30], 25);
// Return value: 2
// Explanation: Using default comparison logic, it returns index 2.
```
