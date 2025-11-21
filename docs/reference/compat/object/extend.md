# extend (Lodash Compatibility)

::: warning Use `Object.assign()` instead

This `extend` function performs slower due to complex logic that handles properties inherited from the prototype chain.

Use the faster and more modern `Object.assign()` instead.

:::

Copies own and inherited properties from source objects to a target object.

```typescript
const result = extend(object, source);
```

## Usage

### `extend(object, ...sources)`

Use `extend` to copy properties from one object to another. Similar to `Object.assign()`, but also copies inherited properties. This function is an alias of `assignIn`.

```typescript
import { extend } from 'es-toolkit/compat';

// Copy basic properties
const target = { a: 1 };
extend(target, { b: 2 }, { c: 3 });
// Returns: { a: 1, b: 2, c: 3 }

// Also copies inherited properties
function Parent() {
  this.a = 1;
}
Parent.prototype.b = 2;

const source = new Parent();
extend({}, source);
// Returns: { a: 1, b: 2 }
```

When there are duplicate properties, later source objects overwrite earlier ones.

```typescript
import { extend } from 'es-toolkit/compat';

extend({ a: 1, b: 2 }, { b: 3 }, { c: 4 });
// Returns: { a: 1, b: 3, c: 4 }
```

#### Parameters

- `object` (`any`): The target object to receive properties.
- `...sources` (`any[]`): The source objects that provide properties.

#### Returns

(`any`): Returns the object with copied properties. The first argument `object` is modified.
