# isSet (Lodash Compatibility)

::: warning Use `es-toolkit`'s [isSet](../../predicate/isSet.md) instead

This `isSet` function is a Lodash compatibility function, but has the same implementation as the main library.

Use the faster and more modern `es-toolkit`'s [isSet](../../predicate/isSet.md) instead.

:::

Checks if a value is a Set.

```typescript
const result = isSet(value);
```

## Usage

### `isSet(value)`

Use `isSet` when you want to type-safely check if a value is a Set. It also works as a type guard in TypeScript.

```typescript
import { isSet } from 'es-toolkit/compat';

// Set checking
const set = new Set();
isSet(set); // true

// Other types return false
isSet(new Map()); // false
isSet(new WeakSet()); // false
isSet([]); // false
isSet({}); // false
isSet('set'); // false
isSet(123); // false
isSet(null); // false
isSet(undefined); // false
```

It also distinguishes from other similar collections.

```typescript
import { isSet } from 'es-toolkit/compat';

// Set vs Map vs WeakSet
isSet(new Set([1, 2, 3])); // true
isSet(new Map([['key', 'value']])); // false
isSet(new WeakSet()); // false

// Set vs array
isSet(new Set([1, 2, 3])); // true
isSet([1, 2, 3]); // false

// Set vs regular objects
isSet(new Set()); // true
isSet({}); // false
isSet(Object.create(null)); // false
```

#### Parameters

- `value` (`unknown`): The value to check if it's a Set.

#### Returns

(`value is Set<any>`): Returns `true` if the value is a Set, `false` otherwise.
