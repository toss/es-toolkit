# keys (Lodash compatibility)

::: warning Use `Object.keys`

This `keys` function operates slowly due to complex logic for handling array-like objects, prototype objects, etc.

Instead, use the faster and more modern `Object.keys()`.

:::

Returns an array of the object's own enumerable property names.

```typescript
const keyArray = keys(object);
```

## Reference

### `keys(object)`

Use `keys` when you want to get the object's own property names. It returns only own properties, excluding inherited properties.

```typescript
import { keys } from 'es-toolkit/compat';

// Keys of a basic object
const object = { a: 1, b: 2, c: 3 };
keys(object);
// => ['a', 'b', 'c']

// Indices of an array
const array = [1, 2, 3];
keys(array);
// => ['0', '1', '2']

// Indices of a string
keys('hello');
// => ['0', '1', '2', '3', '4']
```

Properties inherited from functions or constructors are excluded.

```typescript
import { keys } from 'es-toolkit/compat';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

keys(new Foo());
// => ['a', 'b'] ('c' is excluded as it's a prototype property)
```

Array-like objects are handled specially.

```typescript
import { keys } from 'es-toolkit/compat';

// TypedArray
const typedArray = new Uint8Array([1, 2, 3]);
keys(typedArray);
// => ['0', '1', '2']

// arguments object
function example() {
  return keys(arguments);
}
example('a', 'b', 'c');
// => ['0', '1', '2']
```

Handles `null` and `undefined` safely.

```typescript
import { keys } from 'es-toolkit/compat';

keys(null);
// => []

keys(undefined);
// => []
```

#### Parameters

- `object` (`any`): The object to get keys from.

#### Returns

(`string[]`): Returns an array of the object's own enumerable property names.
