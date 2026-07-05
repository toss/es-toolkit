# omitDeep

Returns a new object excluding the specified nested paths.

```typescript
const result = omitDeep(object, paths);
```

## Usage

### `omitDeep(object, paths)`

Use `omitDeep` when you want to exclude specific nested properties from an object. It returns a new object with the properties corresponding to the specified dot-separated paths removed. Nested objects and objects within arrays are processed recursively.

```typescript
import { omitDeep } from 'es-toolkit/object';

// Omit a nested property
const obj = { a: 1, b: { x: 2, y: 3 }, c: 4 };
const result = omitDeep(obj, ['b.x']);
// result is { a: 1, b: { y: 3 }, c: 4 }

// Omit deeply nested properties
const nested = {
  user: {
    id: 1,
    profile: {
      name: 'John',
      email: 'john@example.com',
    },
  },
};
const nestedResult = omitDeep(nested, ['user.profile.email']);
// nestedResult is {
//   user: {
//     id: 1,
//     profile: {
//       name: 'John',
//     },
//   },
// }

// Omit a property from every object in an array
const users = {
  users: [
    { id: 1, secret: 'abc' },
    { id: 2, secret: 'def' },
  ],
};
const withoutSecrets = omitDeep(users, ['users.secret']);
// withoutSecrets is {
//   users: [
//     { id: 1 },
//     { id: 2 },
//   ],
// }

// Omit an entire nested object or array
const data = {
  user: { id: 1, profile: { name: 'John' } },
  items: [1, 2, 3],
};
const trimmed = omitDeep(data, ['user.profile', 'items']);
// trimmed is { user: { id: 1 } }
```

#### Parameters

- `object` (`T`): The object to exclude paths from.
- `paths` (`readonly string[]`): An array of dot-separated paths to exclude from the object.

#### Returns

(`OmitDeep<T, P>`): A new object with the specified paths excluded.
