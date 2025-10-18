# toMerged

Returns a new object with the source object deeply merged into a copy of the target object.

```typescript
const result = toMerged(target, source);
```

## Reference

### `toMerged(target, source)`

Use `toMerged` when you want to deeply merge two objects but don't want to modify the original object. Unlike [merge](./merge.md), this function does not modify the original `target` object and returns a new object.

```typescript
import { toMerged } from 'es-toolkit/object';

// Basic object merging
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = toMerged(target, source);
// result is { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }
// target remains { a: 1, b: { x: 1, y: 2 } }

// Arrays are also merged
const arrayTarget = { a: [1, 2], b: { x: 1 } };
const arraySource = { a: [3], b: { y: 2 } };
const arrayResult = toMerged(arrayTarget, arraySource);
// arrayResult is { a: [3, 2], b: { x: 1, y: 2 } }
// arrayTarget is not modified

// null values are handled appropriately
const nullTarget = { a: null };
const nullSource = { a: [1, 2, 3] };
const nullResult = toMerged(nullTarget, nullSource);
// nullResult is { a: [1, 2, 3] }
```

`undefined` values do not overwrite existing values.

```typescript
const target = { a: 1, b: 2 };
const source = { b: undefined, c: 3 };
const result = toMerged(target, source);
// result is { a: 1, b: 2, c: 3 } (b is not overwritten)
```

#### Parameters

- `target` (`T extends Record<PropertyKey, any>`): The target object to be merged. This object is not modified.
- `source` (`S extends Record<PropertyKey, any>`): The source object to merge into the target object.

#### Returns

(`T & S`): Returns a new object with the target and source objects merged.

## Demo

::: sandpack

```ts index.ts
import { toMerged } from 'es-toolkit';

const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = toMerged(target, source);
console.log(result);
```

:::
