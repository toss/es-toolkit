# omit

Returns a new object excluding the specified keys.

```typescript
const result = omit(obj, keys);
```

## Reference

### `omit(obj, keys)`

Use `omit` when you want to exclude specific keys from an object. It returns a new object with the properties corresponding to the specified keys removed.

```typescript
import { omit } from 'es-toolkit/object';

// Exclude specific keys
const obj = { a: 1, b: 2, c: 3, d: 4 };
const result = omit(obj, ['b', 'c']);
// result is { a: 1, d: 4 }

// Specifying non-existent keys doesn't cause an error
const safe = omit(obj, ['b', 'nonexistent']);
// safe is { a: 1, c: 3, d: 4 }
```

#### Parameters

- `obj` (`T extends Record<string, any>`): The object to exclude keys from.
- `keys` (`readonly K[]`): An array of keys to exclude from the object.

#### Returns

(`Omit<T, K>`): A new object with the specified keys excluded.
