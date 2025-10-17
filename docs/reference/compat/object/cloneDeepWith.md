# cloneDeepWith (Lodash compatibility)

::: warning Implementing custom logic is recommended

This `cloneDeepWith` function is relatively slow due to complex customizer function and deep copy processing.

Instead, use `cloneDeep` and implement custom logic directly.

:::

Creates a deep copy of an object using a customizer function.

```typescript
const cloned = cloneDeepWith(value, customizer);
```

## Reference

### `cloneDeepWith(value, customizer?)`

Use `cloneDeepWith` when you want to customize how deep copying works. The customizer function controls how specific values are copied.

```typescript
import { cloneDeepWith } from 'es-toolkit/compat';

// Basic usage (without customizer)
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};
const cloned = cloneDeepWith(obj);
// Returns: { a: 1, b: { c: 2 } } (completely new instances)

// Special handling for Date objects
const obj2 = {
  name: 'test',
  createdAt: new Date('2023-01-01'),
  nested: {
    updatedAt: new Date('2023-12-31'),
  },
};
const cloned2 = cloneDeepWith(obj2, value => {
  if (value instanceof Date) {
    // Convert Date to timestamp number
    return value.getTime();
  }
  // Returning undefined uses default deep copy behavior
});
// Returns: {
//   name: 'test',
//   createdAt: 1672531200000,
//   nested: { updatedAt: 1703980800000 }
// }

// Transforming array elements
const arr = [1, [2, 3], { a: 4, b: [5, 6] }];
const clonedArr = cloneDeepWith(arr, value => {
  if (typeof value === 'number') {
    return value * 10;
  }
});
// Returns: [10, [20, 30], { a: 40, b: [50, 60] }]

// Handling functions
const objWithFunc = {
  data: { count: 1 },
  increment: function () {
    this.data.count++;
  },
};
const clonedWithFunc = cloneDeepWith(objWithFunc, value => {
  if (typeof value === 'function') {
    // Convert function to string
    return value.toString();
  }
});
// Returns: {
//   data: { count: 1 },
//   increment: "function() { this.data.count++; }"
// }
```

Combining circular references and customizer:

```typescript
import { cloneDeepWith } from 'es-toolkit/compat';

const obj = { a: 1, b: { c: 2 } };
obj.b.self = obj; // circular reference

const cloned = cloneDeepWith(obj, value => {
  if (typeof value === 'number') {
    return value + 100;
  }
});

console.log(cloned.a); // 101
console.log(cloned.b.c); // 102
console.log(cloned.b.self === cloned); // true (circular reference preserved)
```

#### Parameters

- `value` (`T`): The value to deep clone.
- `customizer` (`function`, optional): A function that determines how to copy. In the form `(value: any, key?: string, object?: any, stack?: Map<any, any>) => any`.

#### Returns

(`T`): Returns the deep copy processed by the customizer.
