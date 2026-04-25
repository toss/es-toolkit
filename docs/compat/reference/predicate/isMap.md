# isMap (Lodash Compatibility)

::: warning Use `es-toolkit`'s [isMap](../../predicate/isMap.md) instead

This `isMap` function operates slowly due to complex handling for Lodash compatibility.

Use the faster and more modern `es-toolkit`'s [isMap](../../predicate/isMap.md) instead.

:::

Checks if a value is a Map.

```typescript
const result = isMap(value);
```

## Usage

### `isMap(value)`

Use `isMap` when you want to type-safely check if a value is a Map. It also works as a type guard in TypeScript.

```typescript
import { isMap } from 'es-toolkit/compat';

// Map checking
const map = new Map();
isMap(map); // true

// Other types return false
isMap(new Set()); // false
isMap(new WeakMap()); // false
isMap({}); // false
isMap([]); // false
isMap('map'); // false
isMap(123); // false
isMap(null); // false
isMap(undefined); // false
```

It also distinguishes from other similar collections.

```typescript
import { isMap } from 'es-toolkit/compat';

// Map vs Set vs WeakMap
isMap(new Map([['key', 'value']])); // true
isMap(new Set(['value'])); // false
isMap(new WeakMap()); // false

// Map vs regular objects
isMap({}); // false
isMap({ key: 'value' }); // false
isMap(Object.create(null)); // false
```

#### Parameters

- `value` (`unknown`): The value to check if it's a Map.

#### Returns

(`value is Map<any, any>`): Returns `true` if the value is a Map, `false` otherwise.
