# hasValue (for `Map`s)

Checks if a Map contains a specific value.

```typescript
const exists = hasValue(map, searchElement);
```

::: info

This function is available exclusively from `es-toolkit/map` to avoid potential conflicts with similar functions for other collection types.

:::

## Usage

### `hasValue(map, searchElement)`

Use `hasValue` when you want to check if a Map contains a specific value. This function uses SameValueZero comparison (similar to Array.prototype.includes), which means that NaN is considered equal to NaN.

```typescript
import { hasValue } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = hasValue(map, 2);
// Result: true

const result2 = hasValue(map, 5);
// Result: false
```

You can search for various value types.

```typescript
import { hasValue } from 'es-toolkit/map';

// Search for NaN (using SameValueZero comparison)
const numbers = new Map([
  ['a', 1],
  ['b', NaN],
  ['c', 3],
]);

const hasNaN = hasValue(numbers, NaN);
// Result: true

// Search for objects (reference equality)
const obj = { id: 1 };
const objects = new Map([
  ['first', obj],
  ['second', { id: 2 }],
]);

const hasObj = hasValue(objects, obj);
// Result: true

const hasSimilar = hasValue(objects, { id: 1 });
// Result: false (different reference)
```

#### Parameters

- `map` (`Map<K, V>`): The Map to search.
- `searchElement` (`V`): The value to search for.

#### Returns

(`boolean`): true if the Map contains the value, false otherwise.
