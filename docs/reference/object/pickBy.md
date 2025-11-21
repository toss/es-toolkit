# pickBy

Returns a new object containing only the properties that satisfy the condition function.

```typescript
const result = pickBy(obj, shouldPick);
```

## Usage

### `pickBy(obj, shouldPick)`

Use `pickBy` when you want to selectively pick properties from an object based on a condition function. Only properties for which the condition function returns `true` are included in the new object.

```typescript
import { pickBy } from 'es-toolkit/object';

// Pick only properties with string values
const obj = { a: 1, b: 'select', c: 3, d: 'also select' };
const result = pickBy(obj, value => typeof value === 'string');
// result is { b: 'select', d: 'also select' }

// Pick only even values
const numbers = { a: 1, b: 2, c: 3, d: 4 };
const evens = pickBy(numbers, value => value % 2 === 0);
// evens is { b: 2, d: 4 }

// Use both key and value
const data = { user1: 25, user2: 17, admin1: 30, admin2: 28 };
const admins = pickBy(data, (value, key) => key.startsWith('admin') && value > 25);
// admins is { admin1: 30, admin2: 28 }
```

#### Parameters

- `obj` (`T extends Record<string, any>`): The object to filter properties from.
- `shouldPick` (`(value: T[keyof T], key: keyof T) => boolean`): A condition function that determines whether to pick a property. Receives the value and key, and returns `true` to pick, `false` to exclude.

#### Returns

(`Partial<T>`): A new object containing only the properties that satisfy the condition function.
