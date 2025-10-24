# matches (Lodash Compatibility)

Creates a function that checks for partial matching with a given pattern.

```typescript
const matcher = matches(pattern);
```

## Reference

### `matches(source)`

Use `matches` when you need to create a function that checks if objects or arrays match a specific pattern in structure and values. Useful for array filtering or object searching.

```typescript
import { matches } from 'es-toolkit/compat';

// Object pattern matching
const userMatcher = matches({ age: 25, department: 'Engineering' });

const users = [
  { name: 'Alice', age: 25, department: 'Engineering' },
  { name: 'Bob', age: 30, department: 'Marketing' },
  { name: 'Charlie', age: 25, department: 'Engineering' },
];

const engineeringUsers = users.filter(userMatcher);
// [{ name: 'Alice', age: 25, department: 'Engineering' },
//  { name: 'Charlie', age: 25, department: 'Engineering' }]

// Nested object pattern
const profileMatcher = matches({
  profile: { city: 'Seoul', verified: true },
});

const profiles = [
  { name: 'Kim', profile: { city: 'Seoul', verified: true, score: 100 } },
  { name: 'Lee', profile: { city: 'Busan', verified: true } },
  { name: 'Park', profile: { city: 'Seoul', verified: false } },
];

const seoulVerifiedUsers = profiles.filter(profileMatcher);
// [{ name: 'Kim', profile: { city: 'Seoul', verified: true, score: 100 } }]

// Array pattern matching
const arrayMatcher = matches([2, 4]);
const arrays = [
  [1, 2, 3, 4, 5],
  [2, 4, 6],
  [1, 3, 5],
];
const matchingArrays = arrays.filter(arrayMatcher);
// [[1, 2, 3, 4, 5], [2, 4, 6]]

// Empty pattern matches all values
const emptyMatcher = matches({});
emptyMatcher({ anything: 'value' }); // true
emptyMatcher([]); // true
emptyMatcher(null); // true
```

#### Parameters

- `source` (`unknown`): The object or value that serves as the match pattern.

#### Returns

(`(target: unknown) => boolean`): Returns a function that checks if the given value partially matches the pattern.
