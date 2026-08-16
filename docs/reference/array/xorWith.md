# xorWith

Creates a new array with elements that exist in only one of two arrays using a given comparison function.

```typescript
const result = xorWith(arr1, arr2, areElementsEqual);
```

## Usage

### `xorWith(arr1, arr2, areElementsEqual)`

Use `xorWith` when you want to find the symmetric difference with complex objects or special comparison conditions. It creates a new array with elements that exist in only one of the two arrays by comparing elements with a user-defined equality function.

```typescript
import { xorWith } from 'es-toolkit/array';

// Compare by object id.
xorWith(
  [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ],
  [
    { id: 2, name: 'Bobby' },
    { id: 3, name: 'Charlie' },
  ],
  (a, b) => a.id === b.id
);
// Returns: [{ id: 1, name: 'Alice' }, { id: 3, name: 'Charlie' }]

// Compare case-insensitively.
xorWith(['Apple', 'Banana'], ['APPLE', 'Cherry'], (a, b) => a.toLowerCase() === b.toLowerCase());
// Returns: ['Banana', 'Cherry']
```

More complex comparisons are also possible.

```typescript
import { xorWith } from 'es-toolkit/array';

// Compare by absolute value.
xorWith([-1, -2, 3], [1, 2, -4], (a, b) => Math.abs(a) === Math.abs(b));
// Returns: [3, -4]

// Deep object comparison.
xorWith(
  [{ specs: { ram: 8, storage: 256 } }],
  [{ specs: { ram: 8, storage: 256 } }],
  (a, b) => a.specs.ram === b.specs.ram && a.specs.storage === b.specs.storage
);
// Returns: []
```

#### Parameters

- `arr1` (`readonly T[]`): The first array to compare.
- `arr2` (`readonly T[]`): The second array to compare.
- `areElementsEqual` (`(item1: T, item2: T) => boolean`): A function that determines if two elements are equal. It should return `true` if they are the same, and `false` otherwise.

#### Returns

(`T[]`): Returns a new array representing the symmetric difference calculated based on the custom equality function.
