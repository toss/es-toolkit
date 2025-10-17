# mergeWith (Lodash compatibility)

::: warning Use `mergeWith` from `es-toolkit`

This `mergeWith` function is relatively slow due to complex type checking, circular reference handling, and special object processing.

Use the faster and more modern [`mergeWith`](../../object/mergeWith.md) from `es-toolkit` instead.

:::

Deeply merges multiple objects while controlling the merge behavior with a custom function.

```typescript
const result = mergeWith(target, ...sources, customizer);
```

## Reference

### `mergeWith(object, ...sources, customizer)`

Deeply merges one or more source objects into the target object, controlling the merge behavior with a customizer function. If the customizer function returns `undefined`, the default merge logic is used. Useful for concatenating arrays or applying special merge rules.

```typescript
import { mergeWith } from 'es-toolkit/compat';

// Add numbers
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const result = mergeWith(obj1, obj2, (objValue, srcValue) => {
  if (typeof objValue === 'number' && typeof srcValue === 'number') {
    return objValue + srcValue;
  }
});
// Result: { a: 1, b: 5, c: 4 }

// Concatenate arrays
const arr1 = { items: [1, 2] };
const arr2 = { items: [3, 4] };
const merged = mergeWith(arr1, arr2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// Result: { items: [1, 2, 3, 4] }

// Concatenate strings
const str1 = { message: 'Hello' };
const str2 = { message: 'World' };
const combined = mergeWith(str1, str2, (objValue, srcValue, key) => {
  if (key === 'message' && typeof objValue === 'string') {
    return objValue + ' ' + srcValue;
  }
});
// Result: { message: 'Hello World' }

// Multiple source objects with customizer
const base = { scores: [80] };
const quiz1 = { scores: [90] };
const quiz2 = { scores: [85] };
const final = mergeWith(base, quiz1, quiz2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// Result: { scores: [80, 90, 85] }
```

The customizer function receives various parameters.

```typescript
import { mergeWith } from 'es-toolkit/compat';

const customizer = (objValue, srcValue, key, object, source, stack) => {
  console.log('Merging:', key, objValue, '->', srcValue);

  // Customize only for specific keys
  if (key === 'specialField') {
    return `${objValue}_${srcValue}`;
  }

  // Return undefined to use default merge logic
  return undefined;
};
```

#### Parameters

- `object` (`any`): The target object to merge into. This object is modified.
- `...sources` (`any[]`): The source objects to merge from.
- `customizer` (`MergeWithCustomizer`): The function to customize value assignment. Format: `(objValue, srcValue, key, object, source, stack) => any`.

#### Returns

(`any`): Returns the merged target object.
