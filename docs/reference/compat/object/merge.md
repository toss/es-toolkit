# merge (Lodash compatibility)

::: warning Use `merge` from `es-toolkit`

This `merge` function is relatively slow as it internally calls the complex `mergeWith` function.

Use the faster and more modern [`merge`](../../object/merge.ts) from `es-toolkit` instead.

:::

Deeply merges multiple objects into a single object.

```typescript
const result = merge(target, ...sources);
```

## Reference

### `merge(object, ...sources)`

Deeply merges one or more source objects into the target object. Nested objects and arrays are recursively merged. If a source object property is `undefined`, it won't overwrite the existing value in the target object. Useful for merging object configurations or applying defaults.

```typescript
import { merge } from 'es-toolkit/compat';

// Basic object merge
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
// Result: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }

// Array merge
const obj1 = { arr: [1, 2] };
const obj2 = { arr: [3, 4] };
const merged = merge(obj1, obj2);
// Result: { arr: [3, 4] } (arrays are replaced)

// Multiple object merge
const base = { a: 1 };
const ext1 = { b: 2 };
const ext2 = { c: 3 };
const ext3 = { d: 4 };
const combined = merge(base, ext1, ext2, ext3);
// Result: { a: 1, b: 2, c: 3, d: 4 }

// Nested object merge
const config = {
  api: { url: 'https://api.example.com', timeout: 5000 },
  features: { auth: true }
};
const overrides = {
  api: { timeout: 10000, retries: 3 },
  features: { analytics: true }
};
const finalConfig = merge(config, overrides);
// Result: {
//   api: { url: 'https://api.example.com', timeout: 10000, retries: 3 },
//   features: { auth: true, analytics: true }
// }
```

The target object is modified, so use an empty object to preserve the original.

```typescript
import { merge } from 'es-toolkit/compat';

const original = { a: 1, b: { x: 1 } };
const source = { b: { y: 2 } };

// Preserve original
const result = merge({}, original, source);
// original is not modified
```

#### Parameters

- `object` (`any`): The target object to merge into. This object is modified.
- `...sources` (`any[]`): The source objects to merge from.

#### Returns

(`any`): Returns the merged target object.
