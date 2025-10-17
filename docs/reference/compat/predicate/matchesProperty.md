# matchesProperty (Lodash Compatibility)

Creates a function that checks if a specific property matches a given value.

```typescript
const checker = matchesProperty(path, value);
```

## Reference

### `matchesProperty(property, source)`

Use `matchesProperty` when you need to create a function that checks if an object's specific property matches a given value. Useful for array filtering or object searching.

```typescript
import { matchesProperty } from 'es-toolkit/compat';

// Simple property check
const checkName = matchesProperty('name', 'Alice');

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 35 },
];

const aliceUsers = users.filter(checkName);
// [{ name: 'Alice', age: 25 }, { name: 'Alice', age: 35 }]

// Nested property check (array path)
const checkCity = matchesProperty(['address', 'city'], 'Seoul');

const profiles = [
  { name: 'Kim', address: { city: 'Seoul', district: 'Gangnam' } },
  { name: 'Lee', address: { city: 'Busan', district: 'Haeundae' } },
  { name: 'Park', address: { city: 'Seoul', district: 'Mapo' } },
];

const seoulUsers = profiles.filter(checkCity);
// [{ name: 'Kim', address: { city: 'Seoul', district: 'Gangnam' } },
//  { name: 'Park', address: { city: 'Seoul', district: 'Mapo' } }]

// Deep path as string
const checkScore = matchesProperty('stats.game.score', 100);

const players = [
  { name: 'Player1', stats: { game: { score: 100, level: 5 } } },
  { name: 'Player2', stats: { game: { score: 95, level: 4 } } },
  { name: 'Player3', stats: { game: { score: 100, level: 6 } } },
];

const perfectScorers = players.filter(checkScore);
// [{ name: 'Player1', stats: { game: { score: 100, level: 5 } } },
//  { name: 'Player3', stats: { game: { score: 100, level: 6 } } }]

// Matching with complex objects
const checkRole = matchesProperty('role', { type: 'admin', permissions: ['read', 'write'] });

const accounts = [
  { user: 'Alice', role: { type: 'admin', permissions: ['read', 'write'] } },
  { user: 'Bob', role: { type: 'user', permissions: ['read'] } },
  { user: 'Charlie', role: { type: 'admin', permissions: ['read', 'write'] } },
];

const admins = accounts.filter(checkRole);
// [{ user: 'Alice', role: { type: 'admin', permissions: ['read', 'write'] } },
//  { user: 'Charlie', role: { type: 'admin', permissions: ['read', 'write'] } }]
```

#### Parameters

- `property` (`PropertyKey | PropertyKey[]`): The property path to check. Can be a string, array, or dot-separated path.
- `source` (`unknown`): The value to compare against the property value.

#### Returns

(`(target: unknown) => boolean`): Returns a function that checks if the given object's property matches the value.
