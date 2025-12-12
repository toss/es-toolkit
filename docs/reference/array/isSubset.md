# isSubset

Checks if one array is a subset of another array.

```typescript
const result = isSubset(superset, subset);
```

## Usage

### `isSubset(superset, subset)`

Use `isSubset` when you want to check if all elements of one array are contained in another array. This is useful for verifying subset relationships or checking if permissions, features, tags, etc., are within the allowed range.

```typescript
import { isSubset } from 'es-toolkit/array';

// Check subset in number arrays
const numbers = [1, 2, 3, 4, 5];
const subset = [2, 3, 4];
isSubset(numbers, subset);
// Returns: true

// Check subset in string arrays
const permissions = ['read', 'write', 'delete', 'admin'];
const userPermissions = ['read', 'write'];
isSubset(permissions, userPermissions);
// Returns: true

// When it's not a subset
const colors = ['red', 'blue', 'green'];
const invalidColors = ['red', 'yellow'];
isSubset(colors, invalidColors);
// Returns: false
```

Special cases are also handled correctly.

```typescript
import { isSubset } from 'es-toolkit/array';

// An empty array is always a subset
const anyArray = [1, 2, 3];
const emptyArray: number[] = [];
isSubset(anyArray, emptyArray);
// Returns: true

// The same array is a subset of itself
const same = ['a', 'b', 'c'];
isSubset(same, same);
// Returns: true

// Works correctly even with duplicate elements
const withDuplicates = [1, 2, 2, 3];
const duplicateSubset = [2, 2];
isSubset(withDuplicates, duplicateSubset);
// Returns: true
```

#### Parameters

- `superset` (`readonly T[]`): The superset array that may contain all elements of the subset.
- `subset` (`readonly T[]`): The subset array to check if it's contained in the superset.

#### Returns

(`boolean`): Returns `true` if all elements of the subset are contained in the superset, otherwise returns `false`.
