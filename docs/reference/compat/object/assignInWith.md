# assignInWith (Lodash compatibility)

::: warning Implementing custom logic is recommended

This `assignInWith` function operates slowly and in a complex manner due to inherited property processing and customizer function calls.

Instead, use `Object.assign` and implement custom logic directly.

:::

Assigns all properties (including inherited properties) from source objects to a target object using a customizer function.

```typescript
const result = assignInWith(target, ...sources, customizer);
```

## Reference

### `assignInWith(target, ...sources, customizer)`

Use `assignInWith` when you want to customize how properties are assigned while including inherited properties. The customizer function determines the final value for each property.

```typescript
import { assignInWith } from 'es-toolkit/compat';

// Basic usage - assign only when undefined
const target = { a: 1, b: undefined };
const source = { b: 2, c: 3 };
const result = assignInWith(target, source, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// Result: { a: 1, b: 2, c: 3 }

// Customizer that merges array values
const target2 = { numbers: [1, 2] };
const source2 = { numbers: [3, 4], name: 'test' };
assignInWith(target2, source2, (objValue, srcValue) => {
  if (Array.isArray(objValue) && Array.isArray(srcValue)) {
    return objValue.concat(srcValue);
  }
  return srcValue;
});
// Result: { numbers: [1, 2, 3, 4], name: 'test' }

// Processing inherited properties too
function Parent() {}
Parent.prototype.inherited = 'value';
const child = Object.create(Parent.prototype);
child.own = 'ownValue';

const target3 = { existing: 'data' };
assignInWith(target3, child, (objValue, srcValue, key) => {
  if (objValue === undefined) {
    return `processed_${srcValue}`;
  }
  return objValue;
});
// Result: { existing: 'data', own: 'processed_ownValue', inherited: 'processed_value' }
```

If the customizer function returns `undefined`, the default assignment behavior is used. Unlike `assignIn`, this function allows you to apply custom logic to each property.

#### Parameters

- `target` (`any`): The target object to which properties will be copied.
- `...sources` (`any[]`): The source objects from which properties will be copied. Both own and inherited properties are copied.
- `customizer` (`function`): A function that determines the value to assign. In the form `(objValue, srcValue, key, object, source) => any`. If it returns `undefined`, the default assignment behavior is used.

#### Returns

(`any`): Returns the modified target object. The target object itself is modified and returned.
