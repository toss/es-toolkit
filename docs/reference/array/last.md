# last

Returns the last element of an array.

This function takes an array and returns the last element of the array. If the array is empty, the function returns `undefined`.

## Signature

```typescript
export function last<T>(arr: readonly [...T[], T]): T;
export function last<T>(arr: readonly T[]): T | undefined;
```

### Parameters

- `arr`(`T[]`): The array from which to get the last element.

### Returns

(`T | undefined`): The last element of the array, or `undefined` if the array is empty.

## Example

```typescript
const arr1 = [1, 2, 3];
const result = last(arr1);
// result will be 3

const arr2: number[] = [];
const result = last(arr2);
// result will be undefined

const largeArray = Array(1000)
  .fill(0)
  .map((_, i) => i);
const result = last(largeArray);
// result will be 999

const nestedArray = [
  [3, 1],
  [3, 2],
  [3, 3],
];
const result = last(nestedArray);
// result will be [3,3]
```
