# isWeakMap (Lodash Compatibility)

::: warning Use `instanceof` operator instead

This `isWeakMap` function is a Lodash compatibility function, but is a simple type check.

Use the simpler and more modern `value instanceof WeakMap` instead.

:::

Checks if a value is a WeakMap.

```typescript
const result = isWeakMap(value);
```

## Usage

### `isWeakMap(value)`

Use `isWeakMap` when you want to type-safely check if a value is a WeakMap. It also works as a type guard in TypeScript.

```typescript
import { isWeakMap } from 'es-toolkit/compat';

// WeakMap checking
const weakMap = new WeakMap();
isWeakMap(weakMap); // true

// Other types return false
isWeakMap(new Map()); // false
isWeakMap(new Set()); // false
isWeakMap(new WeakSet()); // false
isWeakMap({}); // false
isWeakMap([]); // false
isWeakMap('weakmap'); // false
isWeakMap(123); // false
isWeakMap(null); // false
isWeakMap(undefined); // false
```

It also distinguishes from other similar collections.

```typescript
import { isWeakMap } from 'es-toolkit/compat';

// WeakMap vs Map
const obj = {};
const weakMap = new WeakMap([[obj, 'value']]);
const map = new Map([[obj, 'value']]);

isWeakMap(weakMap); // true
isWeakMap(map); // false

// WeakMap vs WeakSet
isWeakMap(new WeakMap()); // true
isWeakMap(new WeakSet()); // false

// WeakMap vs regular objects
isWeakMap(new WeakMap()); // true
isWeakMap({}); // false
```

It's useful when utilizing WeakMap's special properties.

```typescript
import { isWeakMap } from 'es-toolkit/compat';

function setupWeakReference(collection: unknown, key: object, value: any) {
  if (isWeakMap(collection)) {
    // WeakMap can only use objects as keys and maintains weak references
    collection.set(key, value);
    console.log('Stored with weak reference in WeakMap');

    // WeakMap does not have size information
    console.log('WeakMap has no size information');
  } else {
    console.log('Not a WeakMap');
  }
}

const weakMap = new WeakMap();
const regularMap = new Map();
const obj = { id: 1 };

setupWeakReference(weakMap, obj, 'data'); // "Stored with weak reference in WeakMap"
setupWeakReference(regularMap, obj, 'data'); // "Not a WeakMap"
```

#### Parameters

- `value` (`unknown`): The value to check if it's a WeakMap.

#### Returns

(`value is WeakMap<object, any>`): Returns `true` if the value is a WeakMap, `false` otherwise.
