# omit (Lodash compatibility)

::: warning Use `omit` from `es-toolkit`

This `omit` function is relatively slow due to deep copying and calling the `unset` function.

Use the faster and more modern [`omit`](../../object/omit.md) from `es-toolkit` instead.

:::

Creates a new object excluding specified keys from an object.

```typescript
const result = omit(obj, ...keys);
```

## Usage

### `omit(object, ...paths)`

Creates a new object excluding specified keys from an object. Supports deep key paths and can specify multiple keys at once using arrays. Useful for removing sensitive information from objects or selecting only needed properties.

```typescript
import { omit } from 'es-toolkit/compat';

// Remove basic keys
const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
const publicUser = omit(user, 'password', 'email');
// Result: { id: 1, name: 'John' }

// Remove multiple keys with array
const data = { a: 1, b: 2, c: 3, d: 4 };
const filtered = omit(data, ['a', 'c']);
// Result: { b: 2, d: 4 }

// Remove deep key paths
const nested = {
  user: { profile: { name: 'John', age: 30 }, settings: { theme: 'dark' } },
  admin: true,
};
const result = omit(nested, 'user.profile.age', 'admin');
// Result: { user: { profile: { name: 'John' }, settings: { theme: 'dark' } } }

// Combine nested arrays and keys
const complex = { a: 1, b: 2, c: 3, d: { e: 4, f: 5 } };
const simplified = omit(complex, 'a', ['b', 'c'], 'd.f');
// Result: { d: { e: 4 } }
```

You can freely combine arrays, strings, and key paths.

```typescript
import { omit } from 'es-toolkit/compat';

const config = {
  api: { url: 'https://api.example.com', key: 'secret', timeout: 5000 },
  ui: { theme: 'dark', language: 'en' },
  debug: true,
};

// Specify keys in multiple ways
const cleaned = omit(config, 'api.key', ['debug'], 'ui.language');
// Result: { api: { url: 'https://api.example.com', timeout: 5000 }, ui: { theme: 'dark' } }
```

`null` or `undefined` are treated as empty objects.

```typescript
import { omit } from 'es-toolkit/compat';

omit(null, 'key'); // {}
omit(undefined, 'key'); // {}
```

#### Parameters

- `object` (`T | null | undefined`): The source object to remove keys from.
- `...paths` (`Array<Many<PropertyKey>>`): The keys to remove. Can specify single keys, arrays of keys, or deep key paths.

#### Returns

(`Partial<T>`): Returns a new object with specified keys removed.
