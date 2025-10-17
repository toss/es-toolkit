# isSubsetWith

Checks if one array is a subset of another array based on a custom comparison function.

```typescript
const result = isSubsetWith(superset, subset, areItemsEqual);
```

## Reference

### `isSubsetWith(superset, subset, areItemsEqual)`

Use `isSubsetWith` when you want to verify a subset relationship using a user-defined comparison function. This is useful when comparing objects or when special comparison logic is needed.

```typescript
import { isSubsetWith } from 'es-toolkit/array';

// Check subset by object's id
const users = [{ id: 1, name: 'john' }, { id: 2, name: 'jane' }, { id: 3, name: 'bob' }];
const targetUsers = [{ id: 2, name: 'jane' }, { id: 1, name: 'john' }];
isSubsetWith(users, targetUsers, (a, b) => a.id === b.id);
// Returns: true

// When it's not a subset
const allUsers = [{ id: 1, name: 'john' }, { id: 2, name: 'jane' }];
const someUsers = [{ id: 3, name: 'bob' }];
isSubsetWith(allUsers, someUsers, (a, b) => a.id === b.id);
// Returns: false
```

Complex comparison logic can also be used.

```typescript
import { isSubsetWith } from 'es-toolkit/array';

// Case-insensitive string comparison
const validNames = ['Alice', 'Bob', 'Charlie'];
const userNames = ['alice', 'BOB'];
isSubsetWith(validNames, userNames, (a, b) => a.toLowerCase() === b.toLowerCase());
// Returns: true

// Number comparison within a range
const validRanges = [1, 2, 3, 4, 5];
const testNumbers = [1.1, 2.8];
isSubsetWith(validRanges, testNumbers, (a, b) => Math.abs(a - b) < 0.5);
// Returns: true (1.1 is close enough to 1, 2.8 is close enough to 3)
```

#### Parameters

- `superset` (`readonly T[]`): The superset array that may contain all elements of the subset.
- `subset` (`readonly T[]`): The subset array to check if it's contained in the superset.
- `areItemsEqual` (`(x: T, y: T) => boolean`): A function to determine if two elements are equal. Should return `true` if equal, `false` otherwise.

#### Returns

(`boolean`): Based on the custom comparison function, returns `true` if all elements of the subset are contained in the superset, otherwise returns `false`.
