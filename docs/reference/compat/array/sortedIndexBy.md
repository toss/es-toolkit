# sortedIndexBy

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Determines the lowest index at which a given value should be inserted into a sorted array to maintain its sort order. Unlike [sortedIndex](./sortedIndex.md), this function allows you to specify a custom iteratee function to extract the value for comparison.

- The iteratee is invoked for both the array elements and the value being inserted.
- This is particularly useful for arrays containing objects or custom data types where the sort order is based on specific properties or computed values.

## Signature

```typescript
function sortedIndexBy<T, R>(
  array: ArrayLike<T> | null | undefined,
  value: T,
  iteratee: (value: T) => R,
  retHighest?: boolean
): number;
```

### Parameters

- `array` (`ArrayLike<T> | null | undefined`):
  The sorted array to inspect. Can be null or undefined, in which case it is treated as an empty array.
- `value` (`T`):
  The value to evaluate and find the appropriate index for insertion.
- `iteratee` (`(item: T) => R`):
  A function that transforms the elements of the array and the value to be inserted. This function determines the sort order by returning the value used for comparison.

### Returns

(`number`): The index at which the value should be inserted to maintain the sort order.

## Example

```typescript
import { sortedIndexBy } from 'es-toolkit/compat';

const objects = [{ x: 10 }, { x: 20 }, { x: 30 }];

// Use an iteratee to extract the `x` property for comparison
sortedIndexBy(objects, { x: 25 }, o => o.x);
// Return value: 2
// Explanation: Based on the `x` property, `{ x: 25 }` returns index 2.

// Handle custom sorting logic
const strings = ['apple', 'banana', 'cherry'];
sortedIndexBy(strings, 'apricot', str => str.length);
// Return value: 1
// Explanation: Based on the string length, 'apricot' returns index 1.
```
