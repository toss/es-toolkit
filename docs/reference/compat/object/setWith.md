# setWith (Lodash Compatibility)

::: warning Use direct assignment instead

This `setWith` function internally calls the `updateWith` function and operates slowly due to complex path processing and customizer logic.

Use faster and more modern direct assignment or destructuring assignment instead.

:::

Sets a value at the specified path while controlling how objects are created with a customizer function.

```typescript
const result = setWith(obj, path, value, customizer);
```

## Reference

### `setWith(object, path, value, customizer)`

Use `setWith` when you want to set a value at a specific path in an object while controlling the type of intermediate objects created with a customizer function. If the customizer returns `undefined`, the default logic (array for array indices, object otherwise) is used.

```typescript
import { setWith } from 'es-toolkit/compat';

// Basic usage (no customizer)
const obj1 = {};
setWith(obj1, 'a.b.c', 4);
console.log(obj1);
// Result: { a: { b: { c: 4 } } }

// Customizer forcing array creation
const obj2 = {};
setWith(obj2, '[0][1]', 'value', () => []);
console.log(obj2);
// Result: { '0': [undefined, 'value'] }

// Customize only under specific conditions
const obj3 = {};
setWith(obj3, 'a[0].b.c', 'nested', (value, key) => {
  // Return empty object only for numeric keys (array indices)
  return typeof key === 'string' && /^\d+$/.test(key) ? {} : undefined;
});
console.log(obj3);
// Result: { a: { '0': { b: { c: 'nested' } } } }

// Use Object constructor as customizer
const obj4 = {};
setWith(obj4, 'x[0].y', 42, Object);
console.log(obj4);
// Result: { x: { '0': { y: 42 } } }

// Complex customizer logic
const obj5 = {};
setWith(obj5, 'data.items[0].props.config', 'value', (value, key, object) => {
  console.log('Creating:', key, 'in', object);

  // Use Map for specific keys
  if (key === 'props') {
    return new Map();
  }

  // Array for numeric keys
  if (typeof key === 'string' && /^\d+$/.test(key)) {
    return [];
  }

  // Regular object by default
  return {};
});

// Use WeakMap as intermediate object
const obj6 = {};
setWith(obj6, 'cache.user.profile', 'data', (value, key) => {
  if (key === 'cache') {
    return new WeakMap();
  }
  return undefined; // Use default behavior
});
```

The customizer function receives three parameters.

```typescript
import { setWith } from 'es-toolkit/compat';

const obj = {};
setWith(obj, 'a.b[0].c', 'value', (nsValue, key, nsObject) => {
  console.log('nsValue:', nsValue); // Current value (usually undefined)
  console.log('key:', key); // Key to create
  console.log('nsObject:', nsObject); // Parent object

  // Return different object types based on specific conditions
  return key === 'b' ? [] : {};
});
```

#### Parameters

- `object` (`T`): The object to set the value in.
- `path` (`PropertyPath`): The path of the property to set.
- `value` (`any`): The value to set.
- `customizer` (`(nsValue: any, key: string, nsObject: T) => any`, optional): Function to customize the creation of intermediate objects.

#### Returns

(`T | R`): Returns the modified object.
