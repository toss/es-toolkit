# cloneDeepWith

Deeply clones the given value with a custom cloning function.

```typescript
const customCloned = cloneDeepWith(obj, cloneValue);
```

## Reference

### `cloneDeepWith(obj, cloneValue)`

Use `cloneDeepWith` when you want to deeply copy an object or array with custom logic for specific values. If the custom function `cloneValue` returns a value, that value is used; if it returns `undefined`, the default deep copying method is used.

```typescript
import { cloneDeepWith } from 'es-toolkit/object';

// Double numbers during cloning
const obj = { a: 1, b: { c: 2, d: 'text' } };
const clonedObj = cloneDeepWith(obj, value => {
  if (typeof value === 'number') {
    return value * 2;
  }
  // Return undefined to use default cloning
});
console.log(clonedObj); // { a: 2, b: { c: 4, d: 'text' } }

// Add 1 to all array elements during cloning
const arr = [1, [2, 3], { num: 4 }];
const clonedArr = cloneDeepWith(arr, value => {
  if (typeof value === 'number') {
    return value + 1;
  }
});
console.log(clonedArr); // [2, [3, 4], { num: 5 }]
```

The custom function receives the current value, key, original object, and internal stack information as parameters.

```typescript
const data = {
  user: { name: 'Alice', age: 30 },
  settings: { theme: 'dark', lang: 'en' },
};

const result = cloneDeepWith(data, (value, key, obj, stack) => {
  // Clone 'user' object with special handling
  if (key === 'user' && typeof value === 'object') {
    return { ...value, cloned: true };
  }

  // Add prefix to strings
  if (typeof value === 'string') {
    return `cloned_${value}`;
  }
});

console.log(result);
// {
//   user: { name: 'cloned_Alice', age: 30, cloned: true },
//   settings: { theme: 'cloned_dark', lang: 'cloned_en' }
// }
```

Using a custom function allows you to freely configure how objects are cloned. For example, you can copy `Date` objects to be one year in the future.

```typescript
const data = {
  created: new Date('2023-01-01'),
  updated: new Date('2023-12-31'),
  name: 'Document',
};

const cloned = cloneDeepWith(data, value => {
  // Set Date objects to one year in the future
  if (value instanceof Date) {
    const newDate = new Date(value);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }
});

console.log(cloned.created.getFullYear()); // 2024
console.log(cloned.updated.getFullYear()); // 2024
```

#### Parameters

- `obj` (`T`): The value to deeply copy.
- `cloneValue` (`(value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any`): A custom cloning function. Return the value to clone, or return `undefined` to use the default method.
  - `value`: The current value being cloned.
  - `key`: The property name of the current value.
  - `obj`: The original object to clone.
  - `stack`: An internal stack to handle circular references.

#### Returns

(`T`): A deep copy processed through the custom function.
