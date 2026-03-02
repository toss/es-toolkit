# omitBy

Returns a new object containing only the properties that do not satisfy the condition function.

```typescript
const result = omitBy(obj, shouldOmit);
```

## Usage

### `omitBy(obj, shouldOmit)`

Use `omitBy` when you want to selectively exclude properties from an object based on a condition function. Properties for which the condition function returns `true` are excluded, and only properties that return `false` are included in the new object.

```typescript
import { omitBy } from 'es-toolkit/object';

// Exclude properties with string values
const obj = { a: 1, b: 'remove', c: 3, d: 'also remove' };
const result = omitBy(obj, value => typeof value === 'string');
// result is { a: 1, c: 3 }

// Exclude only even values
const numbers = { a: 1, b: 2, c: 3, d: 4 };
const odds = omitBy(numbers, value => value % 2 === 0);
// odds is { a: 1, c: 3 }

// Use both key and value
const data = { user1: 25, user2: 17, admin1: 30, admin2: 28 };
const nonAdmins = omitBy(data, (value, key) => key.startsWith('admin'));
// nonAdmins is { user1: 25, user2: 17 }
```

#### Parameters

- `obj` (`T extends Record<string, any>`): The object to filter properties from.
- `shouldOmit` (`(value: T[keyof T], key: keyof T) => boolean`): A condition function that determines whether to exclude a property. Receives the value and key, and returns `true` to exclude, `false` to keep.

#### Returns

(`Partial<T>`): A new object consisting of properties that do not satisfy the condition function.
