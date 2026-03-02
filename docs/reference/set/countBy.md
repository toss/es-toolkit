# countBy (for `Set`s)

Counts the occurrences of items in a Set based on a transformation function.

```typescript
const counts = countBy(set, mapper);
```

::: info

This function is available exclusively from `es-toolkit/set` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `countBy(set, mapper)`

Use `countBy` when you want to count how many elements in a Set fall into different categories. Provide a function that generates a key from each value, and it returns a Map with the generated keys and their counts as values. The count is incremented for each element for which the transformation produces the same key.

```typescript
import { countBy } from 'es-toolkit/set';

const set = new Set([1, 2, 3, 4, 5]);

const result = countBy(set, value => (value % 2 === 0 ? 'even' : 'odd'));
// Result: Map(2) { 'odd' => 3, 'even' => 2 }
```

You can count elements based on various criteria.

```typescript
import { countBy } from 'es-toolkit/set';

// Count by string length
const words = new Set(['apple', 'banana', 'cherry', 'date']);

const byLength = countBy(words, word => word.length);
// Result: Map(3) { 5 => 1, 6 => 2, 4 => 1 }

// Count by property
const users = new Set([
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'user' },
  { name: 'Diana', role: 'admin' },
]);

const byRole = countBy(users, user => user.role);
// Result: Map(2) { 'admin' => 2, 'user' => 2 }

// Count by derived category
const ages = new Set([15, 25, 35, 45, 55]);

const ageGroups = countBy(ages, age => {
  if (age < 18) return 'minor';
  if (age < 65) return 'adult';
  return 'senior';
});
// Result: Map(2) { 'minor' => 1, 'adult' => 4 }
```

#### Parameters

- `set` (`Set<T>`): The Set to count occurrences from.
- `mapper` (`(value: T, value2: T, set: Set<T>) => K`): The function to produce a key for counting.

#### Returns

(`Map<K, number>`): A Map containing the mapped keys and their counts.
