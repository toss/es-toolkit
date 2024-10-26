# merge

Merges the properties of the source object into the target object.

This function performs a deep merge, meaning nested objects and arrays are merged recursively.

- If a property in the source object is an array or an object and the corresponding property in the target object is also an array or object, they will be merged.
- If a property in the source object is undefined, it will not overwrite a defined property in the target object.

Unlike [toMerged](./toMerged.md), this function mutates the target object.

## Signature

```typescript
function merge<T extends Record<PropertyKey, any>, S extends Record<PropertyKey, any>>(target: T, source: S): T & S;
```

### Parameters

- `target` (`T`): The target object into which the source object properties will be merged. This object is modified in place.
- `source` (`S`): The source object whose properties will be merged into the target object.

### Returns

(`T & S`): The updated target object with properties from the source object merged in.

## Examples

```typescript
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
console.log(result);
// Output: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }

const target = { a: [1, 2], b: { x: 1 } };
const source = { a: [3], b: { y: 2 } };
const result = merge(target, source);
console.log(result);
// Output: { a: [3, 2], b: { x: 1, y: 2 } }

const target = { a: null };
const source = { a: [1, 2, 3] };
const result = merge(target, source);
console.log(result);
// Output: { a: [1, 2, 3] }
```

## Demo

::: sandpack

```ts index.ts
import { merge } from 'es-toolkit';

const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
console.log(result);
```

:::

## Performance Comparison

|                   | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 271 bytes (97.8% smaller)           | 1,952,436 times (3.65× faster)      |
| es-toolkit/compat | 4,381 bytes (64.9% smaller)         | 706,558 times (1.32× faster)        |
| lodash-es         | 12,483 bytes                        | 533,484 times                       |
