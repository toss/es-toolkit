# xorBy

Creates a new array with elements that exist in only one of two arrays, based on values transformed by a given function.

```typescript
const result = xorBy(arr1, arr2, mapper);
```

## Usage

### `xorBy(arr1, arr2, mapper)`

Use `xorBy` when you want to find the symmetric difference of two arrays by comparing elements based on a specific criterion. It creates a new array with elements that exist in only one of the two arrays after transforming each element with a mapping function.

```typescript
import { xorBy } from 'es-toolkit/array';

// Get symmetric difference by object id.
xorBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], obj => obj.id);
// Returns: [{ id: 1 }, { id: 3 }]

// Get symmetric difference by string length.
xorBy(['apple', 'banana'], ['grape', 'cherry', 'apple'], str => str.length);
// Returns: [] (elements with lengths that are all duplicated)
```

Elements with the same result from the mapping function are treated as one.

```typescript
import { xorBy } from 'es-toolkit/array';

xorBy([1, 2, 3, 4], [3, 4, 5, 6], n => n % 3);
// Returns: [] (elements with remainders that are all duplicated)
```

#### Parameters

- `arr1` (`readonly T[]`): The first array to compare.
- `arr2` (`readonly T[]`): The second array to compare.
- `mapper` (`(item: T) => U`): A function that transforms each element into a value for comparison.

#### Returns

(`T[]`): Returns a new array representing the symmetric difference calculated based on the mapping function's results.
