# keyBy (Lodash Compatibility)

::: warning Use `es-toolkit`'s [keyBy](../../array/keyBy.md)

This `keyBy` function is slow due to handling `null` or `undefined`, various parameter types, etc.

Use the faster and more modern `es-toolkit`'s [keyBy](../../array/keyBy.md) instead.

:::

Organizes collection elements into an object based on the specified key.

```typescript
const result = keyBy(collection, iteratee);
```

## Reference

### `keyBy(collection, iteratee)`

Organizes each element in an array or object into an object using the specified key generation function or property name. If multiple elements have the same key, the last element is used.

```typescript
import { keyBy } from 'es-toolkit/compat';

// Generate keys by property name
const array = [
  { dir: 'left', code: 97 },
  { dir: 'right', code: 100 },
];

keyBy(array, 'dir');
// => { left: { dir: 'left', code: 97 }, right: { dir: 'right', code: 100 } }

// Generate keys using a function
keyBy(array, o => String.fromCharCode(o.code));
// => { a: { dir: 'left', code: 97 }, d: { dir: 'right', code: 100 } }

// Can also be used with objects
const obj = {
  a: { id: 1, name: 'john' },
  b: { id: 2, name: 'jane' },
};
keyBy(obj, 'name');
// => { john: { id: 1, name: 'john' }, jane: { id: 2, name: 'jane' } }
```

`null` or `undefined` are treated as empty objects.

```typescript
import { keyBy } from 'es-toolkit/compat';

keyBy(null, 'id'); // {}
keyBy(undefined, 'id'); // {}
```

#### Parameters

- `collection` (`ArrayLike<T> | null | undefined`): The array or object to organize by key.
- `iteratee` (`ValueIterateeCustom<T, PropertyKey>`, optional): The function or property name to generate keys. If omitted, the element itself is used as the key.

#### Returns

(`Record<string, T>`): Returns a new object where each element is mapped to the generated key.
