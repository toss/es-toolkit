# toPairs (Lodash Compatibility)

::: warning Use `Object.entries` instead

This `toPairs` function operates slowly due to complex logic for handling `Map` and `Set`, array-like object processing, etc.

Use faster and more modern `Object.entries()` instead.

:::

Converts an object to an array of key-value pairs.

```typescript
const pairs = toPairs(object);
```

## Usage

### `toPairs(object)`

Use `toPairs` when you want to convert an object's own enumerable properties to an array of `[key, value]` pairs. Inherited properties are not included.

```typescript
import { toPairs } from 'es-toolkit/compat';

// Basic object conversion
const object = { a: 1, b: 2, c: 3 };
toPairs(object);
// => [['a', 1], ['b', 2], ['c', 3]]

// Object with numeric keys
const numbers = { 0: 'zero', 1: 'one', 2: 'two' };
toPairs(numbers);
// => [['0', 'zero'], ['1', 'one'], ['2', 'two']]
```

Can also handle `Map` and `Set`.

```typescript
import { toPairs } from 'es-toolkit/compat';

// Map object conversion
const map = new Map();
map.set('name', 'John');
map.set('age', 30);
toPairs(map);
// => [['name', 'John'], ['age', 30]]

// Set object conversion (value is the same as key)
const set = new Set([1, 2, 3]);
toPairs(set);
// => [[1, 1], [2, 2], [3, 3]]
```

Safely handles `null` or `undefined`.

```typescript
import { toPairs } from 'es-toolkit/compat';

toPairs(null);
// => []

toPairs(undefined);
// => []
```

#### Parameters

- `object` (`object`): The object, Map, or Set to convert.

#### Returns

(`Array<[string, any]>`): Returns an array of key-value pairs.
