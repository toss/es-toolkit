# countBy (for `Map`s)

Counts the occurrences of items in a Map based on a transformation function.

```typescript
const counts = countBy(map, mapper);
```

::: info

This function is available exclusively from `es-toolkit/map` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `countBy(map, mapper)`

Use `countBy` when you want to count how many entries in a Map fall into different categories. Provide a function that generates a key from each value-key pair, and it returns a Map with the generated keys and their counts as values. The count is incremented for each entry for which the transformation produces the same key.

```typescript
import { countBy } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 1],
]);

const result = countBy(map, value => value);
// Result: Map(2) { 1 => 2, 2 => 1 }
```

You can count entries based on various criteria.

```typescript
import { countBy } from 'es-toolkit/map';

// Count by value property
const users = new Map([
  ['user1', { name: 'Alice', age: 25, department: 'Engineering' }],
  ['user2', { name: 'Bob', age: 30, department: 'Engineering' }],
  ['user3', { name: 'Charlie', age: 35, department: 'Sales' }],
]);

const byDepartment = countBy(users, user => user.department);
// Result: Map(2) { 'Engineering' => 2, 'Sales' => 1 }

// Count by derived value
const ages = new Map([
  ['p1', 25],
  ['p2', 30],
  ['p3', 25],
  ['p4', 40],
]);

const ageGroups = countBy(ages, age => (age < 30 ? 'young' : 'senior'));
// Result: Map(2) { 'young' => 2, 'senior' => 2 }

// Count using both value and key
const items = new Map([
  ['alice', 20],
  ['bob', 30],
  ['carol', 20],
]);

const firstLetter = countBy(items, (value, key) => key[0]);
// Result: Map(3) { 'a' => 1, 'b' => 1, 'c' => 1 }
```

#### Parameters

- `map` (`Map<K, V>`): The Map to count occurrences from.
- `mapper` (`(value: V, key: K, object: Map<K, V>) => K2`): The function to produce a key for counting.

#### Returns

(`Map<K2, number>`): A Map containing the mapped keys and their counts.
