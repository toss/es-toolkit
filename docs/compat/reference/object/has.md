# has (Lodash Compatibility)

::: warning Use `Object.hasOwn` or `in` operator instead

This `has` function is slow due to complex path parsing and array index handling.

Instead, use the faster and more modern `Object.hasOwn()` or the `in` operator.

:::

Checks if a property at the specified path exists in an object.

```typescript
const exists = has(object, path);
```

## Usage

### `has(object, path)`

Use `has` to check if an object has a property at a specific path. It only checks own properties and does not check inherited properties.

```typescript
import { has } from 'es-toolkit/compat';

// Simple property check
const object = { a: 1, b: 2 };
has(object, 'a');
// => true

// Nested object check
const nested = { a: { b: { c: 3 } } };
has(nested, 'a.b.c');
// => true
has(nested, ['a', 'b', 'c']);
// => true

// Non-existent property
has(nested, 'a.b.d');
// => false

// Array index check
const array = [1, 2, 3];
has(array, 2);
// => true
has(array, 5);
// => false
```

It works correctly with sparse arrays too.

```typescript
import { has } from 'es-toolkit/compat';

const sparse = [1, , 3]; // index 1 is empty
has(sparse, 0); // true
has(sparse, 1); // true - actually exists, but value is undefined
has(sparse, 2); // true
```

#### Parameters

- `object` (`any`): The object to query.
- `path` (`PropertyPath`): The path of the property to check. Can be represented as a string, number, symbol, or array.

#### Returns

(`boolean`): Returns `true` if the property exists at the path, otherwise `false`.
