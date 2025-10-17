# merge

Deeply merges the source object into the target object, modifying the target object.

```typescript
const result = merge(target, source);
```

## Reference

### `merge(target, source)`

Use `merge` when you want to deeply merge two objects. Nested objects and arrays are also merged recursively. Unlike [toMerged](./toMerged.md), this function modifies the original `target` object.

```typescript
import { merge } from 'es-toolkit/object';

// Basic object merging
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = merge(target, source);
// Both result and target become { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }

// Arrays are also merged
const arrayTarget = { a: [1, 2], b: { x: 1 } };
const arraySource = { a: [3], b: { y: 2 } };
merge(arrayTarget, arraySource);
// arrayTarget becomes { a: [3, 2], b: { x: 1, y: 2 } }

// null values are handled appropriately
const nullTarget = { a: null };
const nullSource = { a: [1, 2, 3] };
merge(nullTarget, nullSource);
// nullTarget becomes { a: [1, 2, 3] }
```

`undefined` values do not overwrite existing values.

```typescript
const target = { a: 1, b: 2 };
const source = { b: undefined, c: 3 };
merge(target, source);
// target becomes { a: 1, b: 2, c: 3 } (b is not overwritten)
```

#### Parameters

- `target` (`T extends Record<PropertyKey, any>`): The target object to merge the source object into. This object is modified.
- `source` (`S extends Record<PropertyKey, any>`): The source object to merge into the target object.

#### Returns

(`T & S`): Returns the target object with the source object merged in.

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
