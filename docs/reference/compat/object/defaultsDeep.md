# defaultsDeep (Lodash Compatibility)

::: warning Use destructuring assignment and `Object.assign()` instead

This `defaultsDeep` function operates slowly and complexly due to recursive merging of nested objects and circular reference handling.

Use faster, more modern destructuring assignment and `Object.assign()` instead.

:::

Recursively sets default values on nested objects.

```typescript
const result = defaultsDeep(target, ...sources);
```

## Usage

### `defaultsDeep(target, ...sources)`

Use `defaultsDeep` when you want to recursively set default values for `undefined` properties in nested objects. Similar to `defaults`, but it also merges nested objects.

```typescript
import { defaultsDeep } from 'es-toolkit/compat';

// Setting default values in nested objects
defaultsDeep({ a: { b: 2 } }, { a: { b: 3, c: 3 }, d: 4 });
// Returns: { a: { b: 2, c: 3 }, d: 4 }

// Only undefined properties are filled with default values
defaultsDeep({ a: { b: undefined } }, { a: { b: 1 } });
// Returns: { a: { b: 1 } }

// null values are preserved
defaultsDeep({ a: null }, { a: { b: 1 } });
// Returns: { a: null }
```

You can pass multiple source objects to apply default values in stages.

```typescript
import { defaultsDeep } from 'es-toolkit/compat';

defaultsDeep({ a: { b: 2 } }, { a: { c: 3 } }, { a: { d: 4 }, e: 5 });
// Returns: { a: { b: 2, c: 3, d: 4 }, e: 5 }
```

#### Parameters

- `target` (`any`): The target object to set default values on.
- `...sources` (`any[]`): The source objects that provide default values.

#### Returns

(`any`): Returns the object with default values recursively set. The first argument `target` is modified.
