# cloneDeep (Lodash compatibility)

::: warning Use `cloneDeep` from `es-toolkit` instead

This `cloneDeep` function is relatively slow due to complex logic that handles special object types.

Use the faster and more modern [cloneDeep](../../object/cloneDeep.md) from `es-toolkit` instead.

:::

Creates a deep copy of an object.

```typescript
const cloned = cloneDeep(value);
```

## Reference

### `cloneDeep(value)`

Use `cloneDeep` when you want to create a deep copy of a value. It copies nested objects and arrays completely as new instances.

```typescript
import { cloneDeep } from 'es-toolkit/compat';

// Copying primitive values
const num = 42;
const clonedNum = cloneDeep(num);
// Returns: 42 (same value)

// Deep copying arrays
const arr = [1, [2, 3], { a: 4 }];
const clonedArr = cloneDeep(arr);
clonedArr[1][0] = 99;
console.log(arr[1][0]); // 2 (original is not changed)
console.log(clonedArr[1][0]); // 99

// Deep copying objects
const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
};
const clonedObj = cloneDeep(obj);
clonedObj.b.d.e = 99;
console.log(obj.b.d.e); // 3 (original is not changed)
console.log(clonedObj.b.d.e); // 99

// Deep copying Date objects
const date = new Date('2023-01-01');
const clonedDate = cloneDeep(date);
// Returns: new Date('2023-01-01') (new Date instance)

// Complex nested structures
const complex = {
  arr: [1, { nested: true }],
  map: new Map([['key', { value: 1 }]]),
  set: new Set([{ item: 1 }]),
  date: new Date(),
};
const clonedComplex = cloneDeep(complex);
// All nested objects are copied as completely new instances
```

Circular references are also handled correctly.

```typescript
import { cloneDeep } from 'es-toolkit/compat';

const obj = { a: 1 };
obj.self = obj; // circular reference

const cloned = cloneDeep(obj);
console.log(cloned !== obj); // true
console.log(cloned.self === cloned); // true (circular reference preserved)
```

#### Parameters

- `value` (`T`): The value to deep clone.

#### Returns

(`T`): Returns the deeply cloned value.
