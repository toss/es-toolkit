# at

Retrieves elements from an array at the specified indices.

This function supports negative indices, which count from the end of the array.

```typescript
const newArr = at(arr, indices);
```

## Reference

### `at(arr, indices)`

Use the `at` function when you want to select elements from an array at specific indices.

```typescript
import { at } from 'es-toolkit';

const arr = ['A', 'B', 'C', 'D'];

const newArr = at(arr, [0, 2]);
// newArr는 ['A', 'C'] 가 되어요.
```

#### Signature

```typescript
function at<T>(arr: T[], indices: number[]): T[];
```

#### Parameters

- `arr` (`T[]`): The array to retrieve elements from.
- `indices` (`number[]`): An array of indices specifying the positions of elements to retrieve.

### Returns

(`T[]`): A new array containing the elements at the specified indices.
