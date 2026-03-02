# extendWith (Lodash compatibility)

::: warning Use `Object.assign()` with a custom function instead

This `extendWith` function is complex and slow due to handling inherited properties from the prototype chain and custom merge logic.

Use the faster and more modern `Object.assign()` with a custom function instead.

:::

Copies own and inherited properties of objects to another object with custom logic.

```typescript
const result = extendWith(object, source, customizer);
```

## Usage

### `extendWith(object, ...sources, customizer)`

Use `extendWith` to merge object properties with custom logic. It's similar to `extend` but allows you to decide how each property should be merged. This function is an alias for `assignInWith`.

```typescript
import { extendWith } from 'es-toolkit/compat';

// Copy properties with custom merge logic
const target = { a: 1, b: 2 };
extendWith(target, { b: 3, c: 4 }, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// Returns: { a: 1, b: 2, c: 4 }

// Custom merge that concatenates arrays
const obj1 = { a: [1, 2] };
const obj2 = { a: [3, 4], b: [5, 6] };
extendWith(obj1, obj2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// Returns: { a: [1, 2, 3, 4], b: [5, 6] }
```

You can use multiple source objects.

```typescript
import { extendWith } from 'es-toolkit/compat';

extendWith({ a: 1 }, { b: 2 }, { c: 3 }, (objValue, srcValue) => srcValue * 2);
// Returns: { a: 1, b: 4, c: 6 }
```

#### Parameters

- `object` (`any`): The target object to receive properties.
- `...sources` (`any[]`): The source objects that provide properties.
- `customizer` (`function`): The function that determines the value to assign for each property. It receives `(objValue, srcValue, key, object, source)`.

#### Returns

(`any`): Returns the object with copied properties. The first argument `object` is modified.
