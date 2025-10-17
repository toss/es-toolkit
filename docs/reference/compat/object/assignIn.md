# assignIn (Lodash compatibility)

::: warning Use `Object.assign` instead

This `assignIn` function operates slowly due to additional processing for copying inherited properties and value comparison logic.

Use the faster and more modern `Object.assign` instead.

:::

Assigns all properties (including inherited properties) from source objects to a target object.

```typescript
const result = assignIn(target, ...sources);
```

## Reference

### `assignIn(target, ...sources)`

Use `assignIn` when you want to copy both own and inherited properties from source objects to a target object. Unlike `assign`, it includes properties from the prototype chain.

```typescript
import { assignIn } from 'es-toolkit/compat';

// Basic usage
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = assignIn(target, source);
// Result: { a: 1, b: 3, c: 4 }
console.log(target === result); // true (target object is modified)

// Merging multiple source objects
const target2 = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
assignIn(target2, source1, source2);
// Result: { a: 1, b: 2, c: 3 }

// Copying inherited properties too
function Parent() {}
Parent.prototype.inherited = 'inheritedValue';
const child = Object.create(Parent.prototype);
child.own = 'ownValue';

const target3 = {};
assignIn(target3, child);
// Result: { own: 'ownValue', inherited: 'inheritedValue' }

// Also copies array index properties and length
const arr = [1, 2, 3];
arr.customProp = 'custom';
const target4 = {};
assignIn(target4, arr);
// Result: { '0': 1, '1': 2, '2': 3, customProp: 'custom', length: 3 }
```

Unlike `assign`, this function copies inherited properties as well. It also has an optimization that doesn't overwrite if values are the same.

#### Parameters

- `target` (`any`): The target object to which properties will be copied.
- `...sources` (`any[]`): The source objects from which properties will be copied. Both own and inherited properties are copied.

#### Returns

(`any`): Returns the modified target object. The target object itself is modified and returned.
