# findLastKey (Lodash Compatibility)

::: warning Use `Array.findLast()` and `Object.keys()` instead

This `findLastKey` function operates in a complex manner due to various condition type handling and compatibility logic.

Instead, use the faster and more modern `Array.findLast()` and `Object.keys()`.

:::

Finds the key of the last element matching a predicate, searching from the end.

```typescript
const key = findLastKey(obj, predicate);
```

## Usage

### `findLastKey(obj, predicate)`

Use `findLastKey` to find the key of the last element matching a predicate in an object. Unlike `findKey`, it searches from the end. You can use various forms of predicates including functions, objects, arrays, and strings.

```typescript
import { findLastKey } from 'es-toolkit/compat';

// Find key using a function predicate
const users = {
  alice: { age: 25, active: true },
  bob: { age: 30, active: false },
  charlie: { age: 35, active: true },
};

findLastKey(users, user => user.active);
// Returns: 'charlie' (first active: true found from the end)

// Find key using an object predicate
findLastKey(users, { active: true });
// Returns: 'charlie'

// Find key using a property path
findLastKey(users, 'active');
// Returns: 'charlie'

// Find key using a property-value array
findLastKey(users, ['active', false]);
// Returns: 'bob'
```

If no element matches the predicate, it returns `undefined`.

```typescript
import { findLastKey } from 'es-toolkit/compat';

findLastKey({ a: 1, b: 2 }, value => value > 5);
// Returns: undefined
```

#### Parameters

- `obj` (`T | null | undefined`): The object to search.
- `predicate` (`ObjectIteratee<T>`, optional): The predicate to apply to each element. Can be a function, object, array, or string.

#### Returns

(`string | undefined`): Returns the key of the last element matching the predicate. Returns `undefined` if none found.
