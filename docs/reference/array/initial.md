# initial

Returns a new array containing all elements except the last one from the input array.

For an empty array or an array with a length of 1, it returns an empty array (`[]`).

## Signature

```typescript
function initial<T>(arr: T[]): T[];
```

### Parameters

- `arr` (`T[]`): The array from which to return all elements except the last one.

### Returns

(T[]): A new array containing all elements except the last one from the input array. For an empty array or an array with a length of 1, it returns an empty array ([]).

## Examples

```typescript
const arr1 = [1, 2, 3];
const result = initial(arr1);
// result is [1, 2].

const arr2: number[] = [];
const result = initial(arr2);
// result is [].

const arr3: number[] = [1];
const result = initial(arr3);
// result is [].

const largeArray = Array(1000)
  .fill(0)
  .map((_, i) => i);
const result = initial(largeArray);
// result is [0, 1, 2 ..., 998].

const nestedArray = [
  [3, 1],
  [3, 2],
  [3, 3],
];
const result = initial(nestedArray);
// result is [[3, 1], [3, 2]].
```
