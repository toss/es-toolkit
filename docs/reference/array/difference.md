# difference

Returns a new array excluding elements from the first array that are in the second array.

```typescript
const result = difference(firstArr, secondArr);
```

## Usage

### `difference(firstArr, secondArr)`

Use `difference` when you want to find the difference between two arrays. A new array is returned containing elements that are only in the first array and not in the second array.

```typescript
import { difference } from 'es-toolkit/array';

// Find the difference of number arrays.
const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
difference(array1, array2);
// Returns: [1, 3, 5]
// 2 and 4 are excluded because they are in both arrays.

// Find the difference of string arrays.
const colors1 = ['red', 'blue', 'green'];
const colors2 = ['blue', 'yellow'];
difference(colors1, colors2);
// Returns: ['red', 'green']
```

The difference with an empty array is the same as the original array.

```typescript
import { difference } from 'es-toolkit/array';

difference([1, 2, 3], []); // [1, 2, 3]
difference([], [1, 2, 3]); // []
```

#### Parameters

- `firstArr` (`T[]`): The reference array to find the difference from.
- `secondArr` (`T[]`): The array containing elements to exclude from the first array.

#### Returns

(`T[]`): A new array containing elements that are only in the first array and not in the second array.

## Performance Comparison

|            | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ---------- | ----------------------------------- | ----------------------------------- |
| es-toolkit | 90 bytes (92.4% smaller)            | 9,317,227 times (85% faster)        |
| lodash-es  | 7,958 bytes                         | 5,030,861 times                     |
