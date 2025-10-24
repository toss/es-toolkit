# intersection

Returns a new array containing elements that are commonly included in both arrays.

```typescript
const result = intersection(firstArr, secondArr);
```

## Reference

### `intersection(firstArr, secondArr)`

Use `intersection` when you want to find only common elements in two arrays. It returns a new array containing only elements from the first array that also exist in the second array. This is useful for finding the intersection of two data sets.

```typescript
import { intersection } from 'es-toolkit/array';

// Find the intersection of number arrays
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [3, 4, 5, 6, 7];
intersection(numbers1, numbers2);
// Returns: [3, 4, 5]

// Find the intersection of string arrays
const strings1 = ['apple', 'banana', 'cherry'];
const strings2 = ['banana', 'cherry', 'date'];
intersection(strings1, strings2);
// Returns: ['banana', 'cherry']
```

It also handles cases with no intersection or special cases.

```typescript
import { intersection } from 'es-toolkit/array';

// Returns an empty array when there's no intersection
const noCommon1 = [1, 2, 3];
const noCommon2 = [4, 5, 6];
intersection(noCommon1, noCommon2);
// Returns: []

// Also returns an empty array when one side is empty
const numbers = [1, 2, 3];
const empty: number[] = [];
intersection(numbers, empty);
// Returns: []
```

#### Parameters

- `firstArr` (`readonly T[]`): The first array to compare.
- `secondArr` (`readonly T[]`): The second array to compare.

#### Returns

(`T[]`): Returns a new array containing elements commonly included in both arrays.
