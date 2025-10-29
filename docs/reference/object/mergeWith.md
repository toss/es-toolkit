# mergeWith

Deeply merges the source object into the target object using a custom merge function, modifying the target object.

```typescript
const result = mergeWith(target, source, mergeFunction);
```

## Reference

### `mergeWith(target, source, merge)`

Use `mergeWith` when you want to apply custom merge logic for each property when merging two objects. If the merge function returns `undefined`, the default deep merge logic is used.

```typescript
import { mergeWith } from 'es-toolkit/object';

// Add number values during merge
const target = { a: 1, b: 2, c: { x: 10 } };
const source = { b: 3, c: { x: 20, y: 30 }, d: 4 };

const result = mergeWith(target, source, (targetValue, sourceValue, key) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue; // Add numbers
  }
  // Returning undefined uses default merge logic
});
// Both result and target become { a: 1, b: 5, c: { x: 30, y: 30 }, d: 4 }

// Concatenate arrays during merge
const arrayTarget = { items: [1, 2], metadata: { count: 2 } };
const arraySource = { items: [3, 4], metadata: { count: 2 } };

mergeWith(arrayTarget, arraySource, (targetValue, sourceValue) => {
  if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
    return targetValue.concat(sourceValue);
  }
});
// arrayTarget becomes { items: [1, 2, 3, 4], metadata: { count: 2 } }

// Apply different merge logic based on key
const config = { timeout: 1000, retries: 3, features: { featureA: true } };
const updates = { timeout: 2000, retries: 5, features: { featureB: false } };

mergeWith(config, updates, (targetValue, sourceValue, key) => {
  if (key === 'timeout') {
    return Math.max(targetValue, sourceValue); // Use larger value for timeout
  }
  if (key === 'retries') {
    return Math.min(targetValue, sourceValue); // Use smaller value for retries
  }
  // Use default merge logic for other properties
});
// config becomes { timeout: 2000, retries: 3, features: { featureA: true, featureB: false } }
```

#### Parameters

- `target` (`T extends Record<PropertyKey, any>`): The target object to merge the source object into. This object is modified.
- `source` (`S extends Record<PropertyKey, any>`): The source object to merge into the target object.
- `merge` (`(targetValue: any, sourceValue: any, key: string, target: T, source: S) => any`): A custom merge function.
  - `targetValue`: The current value in the target object
  - `sourceValue`: The value in the source object
  - `key`: The key of the property being merged
  - `target`: The target object
  - `source`: The source object

#### Returns

(`T & S`): Returns the target object with the source object merged in.

## Examples

```typescript
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

mergeWith(target, source, (targetValue, sourceValue) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue;
  }
});
// Output: { a: 1, b: 5, c: 4 }

const target = { a: [1], b: [2] };
const source = { a: [3], b: [4] };

const result = mergeWith(target, source, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// Output: { a: [1, 3], b: [2, 4] })
```

## Demo

::: sandpack

```ts index.ts
import { mergeWith } from 'es-toolkit';

const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const result = mergeWith(target, source, (targetValue, sourceValue) => {
  if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
    return targetValue + sourceValue;
  }
});
console.log(result);
```

:::
