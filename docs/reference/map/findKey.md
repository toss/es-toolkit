# findKey (for `Map`s)

Finds the first key in a Map for which the predicate function returns true.

```typescript
const key = findKey(map, doesMatch);
```

::: info

This function is available exclusively from `es-toolkit/map` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `findKey(map, doesMatch)`

Use `findKey` when you want to find the key of the first entry that matches a specific condition. Provide a predicate function that tests each entry, and it returns the key of the first matching entry or undefined if none is found.

```typescript
import { findKey } from 'es-toolkit/map';

const map = new Map([
  ['apple', { color: 'red', quantity: 10 }],
  ['banana', { color: 'yellow', quantity: 5 }],
  ['grape', { color: 'purple', quantity: 15 }],
]);

const result = findKey(map, value => value.quantity > 10);
// Result: 'grape'
```

You can search based on various criteria.

```typescript
import { findKey } from 'es-toolkit/map';

// Find by value property
const users = new Map([
  ['user1', { name: 'Alice', age: 25 }],
  ['user2', { name: 'Bob', age: 30 }],
  ['user3', { name: 'Charlie', age: 35 }],
]);

const seniorUser = findKey(users, user => user.age >= 35);
// Result: 'user3'

// Find by key pattern
const settings = new Map([
  ['api.timeout', 5000],
  ['api.retries', 3],
  ['db.host', 'localhost'],
]);

const dbSetting = findKey(settings, (value, key) => key.startsWith('db.'));
// Result: 'db.host'
```

#### Parameters

- `map` (`Map<K, V>`): The Map to search.
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): A predicate function that tests each entry.

#### Returns

(`K | undefined`): The key of the first entry that satisfies the predicate, or undefined if none found.
