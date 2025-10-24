# defaults (Lodash Compatibility)

::: warning Use `Object.assign()` instead

This `defaults` function operates slowly due to complex logic that handles `undefined` and properties inherited from `Object.prototype` specially.

Use faster, more modern `Object.assign()` instead.

:::

Fills in `undefined` properties in an object by setting default values.

```typescript
const result = defaults(object, source);
```

## Reference

### `defaults(object, ...sources)`

Use `defaults` when you want to set default values for `undefined` properties or properties inherited from `Object.prototype` in an object. You can pass multiple default value objects, and they are applied in order from left to right.

```typescript
import { defaults } from 'es-toolkit/compat';

// Fill undefined properties with default values
defaults({ a: 1 }, { a: 2, b: 2 }, { c: 3 });
// Returns: { a: 1, b: 2, c: 3 }

// Only undefined properties are filled with default values
defaults({ a: undefined }, { a: 1 });
// Returns: { a: 1 }

// null values are preserved
defaults({ a: null }, { a: 1 });
// Returns: { a: null }
```

If a property already has a value, it won't be overwritten with the default value.

```typescript
import { defaults } from 'es-toolkit/compat';

defaults({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
// Returns: { a: 1, b: 2, c: 3 }
```

#### Parameters

- `object` (`any`): The target object to set default values on.
- `...sources` (`any[]`): The source objects that provide default values.

#### Returns

(`any`): Returns the object with default values set. The first argument `object` is modified.
