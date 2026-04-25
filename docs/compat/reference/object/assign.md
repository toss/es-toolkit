# assign (Lodash compatibility)

::: warning Use `Object.assign` instead

This `assign` function operates slowly due to additional logic that checks whether values are equal.

Use the faster and more modern `Object.assign` instead.

:::

Assigns properties from source objects to a target object.

```typescript
const result = assign(target, ...sources);
```

## Usage

### `assign(target, ...sources)`

Use `assign` when you want to copy properties from one or more source objects to a target object. If there are duplicate keys, values from later sources will overwrite earlier ones.

```typescript
import { assign } from 'es-toolkit/compat';

// Basic usage
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = assign(target, source);
// Result: { a: 1, b: 3, c: 4 }
console.log(target === result); // true (target object is modified)

// Merging multiple source objects
const target2 = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
const source3 = { d: 4 };
assign(target2, source1, source2, source3);
// Result: { a: 1, b: 2, c: 3, d: 4 }

// Overwriting properties
const target3 = { x: 1, y: 2 };
const source4 = { y: 3, z: 4 };
const source5 = { y: 5 };
assign(target3, source4, source5);
// Result: { x: 1, y: 5, z: 4 } (y is overwritten with the last value)
```

This function only copies own properties of objects, not inherited properties. It also has an optimization that doesn't overwrite if values are the same.

#### Parameters

- `target` (`any`): The target object to which properties will be copied.
- `...sources` (`any[]`): The source objects from which properties will be copied.

#### Returns

(`any`): Returns the modified target object. The target object itself is modified and returned.
