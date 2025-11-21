# assignWith (Lodash compatibility)

::: warning Implementing custom logic is recommended

This `assignWith` function is relatively slow due to complex customizer function processing.

Instead, use `Object.assign` and implement custom logic directly.

:::

Assigns properties from source objects to a target object using a customizer function.

```typescript
const result = assignWith(target, source1, source2, customizer);
```

## Usage

### `assignWith(object, ...sources, customizer)`

Use `assignWith` when you want to customize how properties are assigned. The customizer function determines the final value for each property.

```typescript
import { assignWith } from 'es-toolkit/compat';

// Basic usage - assign only when undefined
const target = { a: 1, b: undefined };
const source = { b: 2, c: 3 };
const result = assignWith(target, source, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// Returns: { a: 1, b: 2, c: 3 }

// Array merging
const target2 = { users: ['alice'] };
const source2 = { users: ['bob', 'charlie'] };
const result2 = assignWith(target2, source2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// Returns: { users: ['alice', 'bob', 'charlie'] }

// Multiple sources with customizer
const target3 = { a: 1 };
const result3 = assignWith(target3, { b: 2 }, { c: 3 }, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// Returns: { a: 1, b: 2, c: 3 }
```

#### Parameters

- `object` (`any`): The target object to which properties will be assigned.
- `...sources` (`any[]`): The source objects from which properties will be copied.
- `customizer` (`function`): A function that determines the value to assign. In the form `(objValue, srcValue, key, object, source) => any`.

#### Returns

(`any`): Returns the target object with values determined by the customizer function.
