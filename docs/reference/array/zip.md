# zip

Combines multiple arrays into a single array of tuples.

This function takes multiple arrays and returns a new array where each element is a tuple
containing the corresponding elements from the input arrays. If the input arrays are of
different lengths, the resulting array will have the length of the longest input array,
with `undefined` values for missing elements.

## Signature

```typescript
function zip<T>(arr1: T[]): [T][];
function zip<T, U>(arr1: T[], arr2: U[]): [T, U][];
function zip<T, U, V>(arr1: T[], arr2: U[], arr3: V[]): [T, U, V][];
function zip<T, U, V, W>(arr1: T[], arr2: U[], arr3: V[], arr4: W[]): [T, U, V, W][];
function zip<T>(...arrs: T[][]): T[][];
```

### Parameters

- `...arrs` (`T[][]`): The arrays to zip together.

### Returns

(`T[][]`): A new array of tuples containing the corresponding elements from the input arrays.

## Examples

```typescript
const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];
const result = zip(arr1, arr2);
// result will be [[1, 'a'], [2, 'b'], [3, 'c']]

const arr3 = [true, false];
const result2 = zip(arr1, arr2, arr3);
// result2 will be [[1, 'a', true], [2, 'b', false], [3, 'c', undefined]]
```
