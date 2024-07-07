# unzipWith

Unzips an array of arrays, applying an `iteratee` function to regrouped elements.

## Signature

```typescript
function unzipWith<T, R>(target: T[][], iteratee: (...args: T[]) => R): R[];
```

### Parameters

- `target`(`T[][]`): The nested array to unzip. This is an array of arrays, where each inner array contains elements to be unzipped.
- `iteratee` (`(...args: T[]) => R`): A function to transform the unzipped elements.

### Returns

(`R[]`): A new array of unzipped and transformed elements. 

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
