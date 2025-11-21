# partition

Returns a tuple that splits an array into two groups based on a condition.

```typescript
const [truthy, falsy] = partition(arr, isInTruthy);
```

## Usage

### `partition(arr, isInTruthy)`

Use `partition` when you want to separate elements in an array into two groups based on a specific condition. It separates elements for which the condition function returns `true` and elements for which it returns `false` into different arrays.

```typescript
import { partition } from 'es-toolkit/array';

// Split a number array into even and odd numbers.
const numbers = [1, 2, 3, 4, 5, 6];
const [evens, odds] = partition(numbers, x => x % 2 === 0);
// evens: [2, 4, 6]
// odds: [1, 3, 5]

// Split an object array by a specific condition.
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true },
];
const [activeUsers, inactiveUsers] = partition(users, user => user.active);
// activeUsers: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]
// inactiveUsers: [{ name: 'Bob', active: false }]
```

It returns two empty arrays for an empty array.

```typescript
import { partition } from 'es-toolkit/array';

const [truthy, falsy] = partition([], x => x > 0);
// truthy: []
// falsy: []
```

#### Parameters

- `arr` (`T[]`): The array to split into two groups.
- `isInTruthy` (`(value: T) => boolean`): A condition function that determines whether each element should be included in the first array (truthy) or the second array (falsy).

#### Returns

(`[truthy: T[], falsy: T[]]`): A tuple consisting of two arrays. The first array contains elements for which the condition is `true`, and the second array contains elements for which the condition is `false`.
