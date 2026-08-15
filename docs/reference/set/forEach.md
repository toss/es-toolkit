# forEach (for `Set`s)

Executes a provided function once for each element in a Set.

```typescript
forEach(set, callback);
```

::: info

This function is available exclusively from `es-toolkit/set` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `forEach(set, callback)`

Use `forEach` when you want to execute a function for each element in a Set. The callback function receives the value twice (for consistency with Map.forEach) and the Set itself as arguments. This is useful for side effects like logging, updating external state, or performing operations on each element.

```typescript
import { forEach } from 'es-toolkit/set';

const set = new Set([1, 2, 3]);

forEach(set, value => {
  console.log(value * 2);
});
// Output:
// 2
// 4
// 6
```

You can perform various operations on each element.

```typescript
import { forEach } from 'es-toolkit/set';

// Accumulate values
const numbers = new Set([1, 2, 3, 4, 5]);

let sum = 0;
forEach(numbers, value => {
  sum += value;
});
// sum is now 15

// Collect elements into an array with transformation
const names = new Set(['alice', 'bob', 'charlie']);

const uppercased: string[] = [];
forEach(names, value => {
  uppercased.push(value.toUpperCase());
});
// uppercased: ['ALICE', 'BOB', 'CHARLIE']

// Update external Set based on conditions
const scores = new Set([85, 92, 78, 95, 88]);

const highScores = new Set<number>();
forEach(scores, value => {
  if (value >= 90) {
    highScores.add(value);
  }
});
// highScores contains 92 and 95

// Process objects
const users = new Set([
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true },
]);

const activeUserIds: number[] = [];
forEach(users, user => {
  if (user.active) {
    activeUserIds.push(user.id);
  }
});
// activeUserIds: [1, 3]
```

#### Parameters

- `set` (`Set<T>`): The Set to iterate over.
- `callback` (`(value: T, value2: T, set: Set<T>) => void`): A function to execute for each element.

#### Returns

(`void`): This function does not return a value.
