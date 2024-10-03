# forEachRight

Iterates over elements of `arr` from right to left and invokes `callback` for each element.

## Signature

```ts
function forEachRight<T>(arr: T[], callback: (value: T, index: number, arr: T[]) => void): void;
```

### Parameters

- `arr` (`T[]`): The array to iterate over.
- `callback` (`(value: T, index: number, arr: T[])`): The function invoked per iteration.
  - `value`: The current element being processed in the array.
  - `index`: The index of the current element being processed in the array.
  - `arr`: The array `forEachRight` was called upon.

### Returns

`void`

## Examples

```ts
import { forEachRight } from 'es-toolkit/array';

const array = [1, 2, 3];
const result: number[] = [];

// Use the forEachRight function to iterate through the array and add each element to the result array.
forEachRight(array, value => {
  result.push(value);
});

console.log(result); // Output: [3, 2, 1];
```
