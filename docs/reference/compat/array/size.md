# size (Lodash Compatibility)

::: warning Use `.length` property

This `size` function operates complexly due to `null`, `undefined` handling and support for various types.

Instead, use the faster and more modern `.length` property or `Object.keys().length`.

:::

Returns the size of arrays, strings, and objects.

```typescript
const length = size(collection);
```

## Reference

### `size(collection)`

Use `size` to check the size of arrays, strings, objects, Maps, and Sets. It provides consistent size information for various types of collections.

```typescript
import { size } from 'es-toolkit/compat';

// Number of elements in an array
size([1, 2, 3]);
// Returns 3

// Number of characters in a string
size('hello');
// Returns 5

// Number of enumerable properties in an object
size({ a: 1, b: 2, c: 3 });
// Returns 3

// Number of elements in a Map
size(
  new Map([
    ['a', 1],
    ['b', 2],
  ])
);
// Returns 2

// Number of elements in a Set
size(new Set([1, 2, 3]));
// Returns 3
```

`null` or `undefined` returns 0.

```typescript
import { size } from 'es-toolkit/compat';

size(null); // 0
size(undefined); // 0
size({}); // 0
size([]); // 0
```

#### Parameters

- `collection` (`object | string | null | undefined`): The array, string, object, Map, or Set to check the size of.

#### Returns

(`number`): Returns the size of the collection. Returns 0 if `null` or `undefined`.
