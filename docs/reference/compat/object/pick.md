# pick (Lodash compatibility)

::: warning Use `pick` from `es-toolkit`

This `pick` function is relatively slow due to complex path processing, calling `get`/`set` functions, and handling `null`/`undefined`.

Use the faster and more modern [`pick`](../../object/pick.md) from `es-toolkit` instead.

:::

Creates a new object by selecting only specified properties from an object.

```typescript
const result = pick(obj, ...keys);
```

## Reference

### `pick(object, ...props)`

Use `pick` when you want to create a new object containing only the desired properties from an object. You can pass multiple keys at once using an array, or pass them one by one as individual arguments. Supports deep key paths so you can also select nested properties.

```typescript
import { pick } from 'es-toolkit/compat';

// Basic usage
const obj = { a: 1, b: 2, c: 3, d: 4 };
const result = pick(obj, ['a', 'c']);
// Result: { a: 1, c: 3 }

// Pass as individual arguments
const result2 = pick(obj, 'a', 'c');
// Result: { a: 1, c: 3 }

// Select deep paths
const nested = {
  user: { profile: { name: 'John', age: 30 }, settings: { theme: 'dark' } },
  admin: true,
};
const userInfo = pick(nested, 'user.profile.name', 'admin');
// Result: { user: { profile: { name: 'John' } }, admin: true }

// Mix arrays and individual keys
const mixed = { a: 1, b: 2, c: 3, d: { e: 4, f: 5 } };
const selected = pick(mixed, ['a', 'b'], 'c', 'd.e');
// Result: { a: 1, b: 2, c: 3, d: { e: 4 } }

// Distinguish between dot notation keys and actual dotted keys
const ambiguous = {
  'a.b': 1, // Actual key 'a.b'
  a: { b: 2, c: 3 }, // Nested object
};
const dotKey = pick(ambiguous, 'a.b');
// Result: { 'a.b': 1 } (actual key takes priority)
```

`null` or `undefined` are treated as empty objects.

```typescript
import { pick } from 'es-toolkit/compat';

pick(null, ['a', 'b']); // {}
pick(undefined, ['a', 'b']); // {}
```

#### Parameters

- `object` (`T | null | undefined`): The object to select properties from.
- `...props` (`Array<Many<PropertyPath>>`): The property keys to select. Can specify single keys, arrays of keys, or deep key paths.

#### Returns

(`Pick<T, U> | Partial<T>`): Returns a new object containing only the specified properties.
