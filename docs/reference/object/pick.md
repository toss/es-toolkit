# pick

Returns a new object containing only the properties corresponding to the specified keys.

```typescript
const result = pick(obj, keys);
```

## Usage

### `pick(obj, keys)`

Use `pick` when you want to select only specific keys from an object. It returns a new object containing only the properties corresponding to the specified keys.

```typescript
import { pick } from 'es-toolkit/object';

// Select specific keys
const obj = { a: 1, b: 2, c: 3, d: 4 };
const result = pick(obj, ['a', 'c']);
// result is { a: 1, c: 3 }

// Non-existent keys are ignored
const safe = pick(obj, ['a', 'nonexistent']);
// safe is { a: 1 }

// Can be used with nested objects
const nested = {
  user: { name: 'John', age: 30 },
  posts: ['post1', 'post2'],
  settings: { theme: 'dark' },
};
const picked = pick(nested, ['user', 'settings']);
// picked is { user: { name: 'John', age: 30 }, settings: { theme: 'dark' } }
```

#### Parameters

- `obj` (`T extends Record<string, any>`): The object to select properties from.
- `keys` (`readonly [...Keys]`): An array or tuple of keys to select from the object.

#### Returns

The return type depends on whether `keys` is a tuple or a variable-length array:

- If `keys` is a **tuple** (e.g. `['a', 'b']`): returns `Pick<T, 'a' | 'b'>` — all specified keys are guaranteed to be present.
- If `keys` is a **variable-length array** (e.g. `keys: ('a' | 'b')[]`): returns `Partial<Pick<T, 'a' | 'b'>>` — only the keys actually in the array will be present.
