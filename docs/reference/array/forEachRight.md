# forEachRight

Iterates over the elements of an array from right to left, executing a function for each element.

```typescript
forEachRight(arr, callback);
```

## Reference

### `forEachRight(arr, callback)`

Use `forEachRight` when you want to traverse an array in reverse order and perform an operation on each element. It calls the callback function sequentially from the last element to the first element of the array. This is useful when you need reverse processing or when you need to work from the end of the array.

```typescript
import { forEachRight } from 'es-toolkit/array';

const array = [1, 2, 3];
const result: number[] = [];

// Use the forEachRight function to traverse the array in reverse order
forEachRight(array, value => {
  result.push(value);
});

console.log(result); // [3, 2, 1]
```

The callback function receives three parameters.

```typescript
import { forEachRight } from 'es-toolkit/array';

const array = ['a', 'b', 'c'];
forEachRight(array, (value, index, arr) => {
  console.log(`Value: ${value}, Index: ${index}, Array:`, arr);
});
// Output:
// Value: c, Index: 2, Array: ['a', 'b', 'c']
// Value: b, Index: 1, Array: ['a', 'b', 'c']
// Value: a, Index: 0, Array: ['a', 'b', 'c']
```

#### Parameters

- `arr` (`T[]`): The array to iterate over.
- `callback` (`(value: T, index: number, arr: T[]) => void`): The function to be executed for each element.
  - `value`: The current array element being processed.
  - `index`: The index of the current element being processed.
  - `arr`: The array that the `forEachRight` function was called upon.
