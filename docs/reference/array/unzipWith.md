# unzipWith

A function that splits or transforms an input array into a new array. This function takes a nested array and returns a new array by either splitting the elements into separate arrays or using an optional iteratee function to transform the unzipped elements.

## Signature

```typescript
function unzipWith<T>(target: readonly T[][] | null | undefined): T[][];
function unzipWith<T, R>(target: readonly T[][] | null | undefined, iteratee: (...args: T[]) => R): R[];
```

### Parameters

- `target`(`T[][] | null | undefined`): The nested array to split or transform. If the array is null or undefined, an empty array is returned.
- `iteratee` (`(...args: T[]) => R`, 선택 사항): A function to transform the unzipped elements. If provided, the iteratee is called with the corresponding elements from the inner arrays, and its return value is included in the result.

### Returns

(`T[][]`): If the iteratee function is not provided, an array of arrays containing the unzipped elements is returned.
(`R[]`): If the iteratee function is provided, an array of the transformed values is returned.

## Examples

```typescript
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const result = unzipWith(nestedArray, (item, item2, item3) => item + item2 + item3);
// [9, 12]
```
