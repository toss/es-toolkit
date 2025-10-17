# findKey (Lodash compatibility)

::: warning Use `es-toolkit`'s `findKey`

This `findKey` function operates in a complex manner due to various condition type handling and compatibility logic.

Instead, use the faster and more modern [findKey](../../object/findKey.md) from `es-toolkit`.

:::

Finds the key of the first element that matches the predicate.

```typescript
const key = findKey(obj, predicate);
```

## Reference

### `findKey(obj, predicate)`

Use `findKey` to find the key of the first element in an object that matches the predicate. You can use various types of predicates such as functions, objects, arrays, and strings.

```typescript
import { findKey } from 'es-toolkit/compat';

// Find key with a function predicate
const users = {
  alice: { age: 25, active: true },
  bob: { age: 30, active: false },
  charlie: { age: 35, active: true },
};

findKey(users, user => user.age > 30);
// Returns: 'charlie'

// Find key with an object predicate
findKey(users, { active: false });
// Returns: 'bob'

// Find key with a property path
findKey(users, 'active');
// Returns: 'alice'
```

If no element matches the predicate, it returns `undefined`.

```typescript
import { findKey } from 'es-toolkit/compat';

findKey({ a: 1, b: 2 }, value => value > 5);
// Returns: undefined
```

#### Parameters

- `obj` (`T | null | undefined`): The object to search.
- `predicate` (`ObjectIteratee<T>`, optional): The predicate to apply to each element. Can be a function, object, array, or string.

#### Returns

(`string | undefined`): Returns the key of the first element that matches the predicate. Returns `undefined` if no match is found.
