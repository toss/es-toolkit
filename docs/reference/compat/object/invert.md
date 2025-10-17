# invert (Lodash compatibility)

::: warning Use `invert` from `es-toolkit`

This `invert` function operates slower due to the complex processing required for Lodash compatibility.

Instead, use the faster and more modern [`invert`](../../object/invert.md) from `es-toolkit`.

:::

Inverts the keys and values of an object.

```typescript
const inverted = invert(object);
```

## Reference

### `invert(object)`

Use `invert` when you want to swap the keys and values of an object. The original object's keys become the values in the new object, and the original object's values become the keys in the new object.

```typescript
import { invert } from 'es-toolkit/compat';

// Basic key-value inversion
const object = { a: 1, b: 2, c: 3 };
invert(object);
// => { '1': 'a', '2': 'b', '3': 'c' }

// Inverting string values
const colors = { red: '#ff0000', green: '#00ff00', blue: '#0000ff' };
invert(colors);
// => { '#ff0000': 'red', '#00ff00': 'green', '#0000ff': 'blue' }

// Mixed key and value types
const mixed = { a: 1, 2: 'b', c: 3, 4: 'd' };
invert(mixed);
// => { '1': 'a', 'b': '2', '3': 'c', 'd': '4' }
```

When there are duplicate values, the last key is used.

```typescript
import { invert } from 'es-toolkit/compat';

// Case with duplicate values
const object = { a: 1, b: 1, c: 2 };
invert(object);
// => { '1': 'b', '2': 'c' }
// 'a' is overwritten and lost
```

#### Parameters

- `object` (`object`): The object to invert.

#### Returns

(`Record<string, string>`): Returns a new object with keys and values inverted.
