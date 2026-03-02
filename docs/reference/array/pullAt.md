# pullAt

Removes elements at specified indices from an array and returns the removed elements.

```typescript
const removed = pullAt(arr, indices);
```

## Usage

### `pullAt(arr, indicesToRemove)`

Use `pullAt` when you want to remove elements at specific positions in an array. This function modifies the original array and returns the removed elements in a new array. It also supports negative indices, which count from the end of the array.

```typescript
import { pullAt } from 'es-toolkit/array';

// Remove elements at multiple indices at once.
const numbers = [10, 20, 30, 40, 50];
const removed = pullAt(numbers, [1, 3, 4]);
console.log(removed); // [20, 40, 50]
console.log(numbers); // [10, 30]

// Safely handle duplicate indices.
const fruits = ['apple', 'banana', 'cherry', 'date'];
const removedFruits = pullAt(fruits, [1, 2, 1]);
console.log(removedFruits); // ['banana', 'cherry', 'banana']
console.log(fruits); // ['apple', 'date']
```

If you specify a non-existent index, `undefined` is returned for that position.

```typescript
import { pullAt } from 'es-toolkit/array';

const items = [1, 2, 3];
const removed = pullAt(items, [0, 5, 2]);
console.log(removed); // [1, undefined, 3]
console.log(items); // [2]
```

#### Parameters

- `arr` (`T[]`): The array from which to remove elements.
- `indicesToRemove` (`number[]`): An array of indices of elements to remove. Negative indices count from the end of the array.

#### Returns

(`T[]`): A new array containing the removed elements. For non-existent indices, `undefined` is included.
