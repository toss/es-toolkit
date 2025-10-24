# hasIn (Lodash compatibility)

::: warning Use the `in` operator instead

This `hasIn` function performs slowly due to complex path parsing and prototype chain checking.

Instead, use the faster and more modern `in` operator or `Object.hasOwn()` function.

:::

Checks if a property at the specified path exists in the object, including inherited properties.

```typescript
const exists = hasIn(object, path);
```

## Reference

### `hasIn(object, path)`

Use `hasIn` when you want to check if an object has a property at a specific path. Unlike `has`, it also checks inherited properties (properties in the prototype chain).

```typescript
import { hasIn } from 'es-toolkit/compat';

// Check own properties
const object = { a: 1, b: 2 };
hasIn(object, 'a');
// => true

// Check nested objects
const nested = { a: { b: { c: 3 } } };
hasIn(nested, 'a.b.c');
// => true
hasIn(nested, ['a', 'b', 'c']);
// => true

// Non-existent property
hasIn(nested, 'a.b.d');
// => false

// Check array indices
const array = [1, 2, 3];
hasIn(array, 2);
// => true
hasIn(array, 5);
// => false
```

It also checks inherited properties.

```typescript
import { hasIn } from 'es-toolkit/compat';

// Check properties in the prototype chain
function Rectangle() {}
Rectangle.prototype.area = function () {};

const rect = new Rectangle();
hasIn(rect, 'area'); // true - finds inherited properties too
has(rect, 'area'); // false - has only checks own properties
```

Safely handles `null` and `undefined`.

```typescript
import { hasIn } from 'es-toolkit/compat';

hasIn(null, 'a');
// => false

hasIn(undefined, 'b');
// => false
```

#### Parameters

- `object` (`any`): The object to inspect.
- `path` (`PropertyPath`): The path of the property to check. This can be represented as a string, number, symbol, or array.

#### Returns

(`boolean`): Returns `true` if the property at the path exists (whether it's an own property or inherited property), otherwise `false`.
