# updateWith (Lodash Compatibility)

::: warning Use direct assignment instead

This `updateWith` function operates slowly due to complex path parsing and customizer handling.

Use faster and more modern direct property assignment or optional chaining instead.

:::

Updates the value at the specified path of the object with an updater function, while controlling path creation with a customizer.

```typescript
const updated = updateWith(obj, path, updater, customizer);
```

## Reference

### `updateWith(obj, path, updater, customizer?)`

Similar to `update`, but you can control the shape of intermediate objects created when the path doesn't exist using a customizer function.

```typescript
import { updateWith } from 'es-toolkit/compat';

// Basic behavior (same as update)
const object = { a: [{ b: { c: 3 } }] };
updateWith(object, 'a[0].b.c', n => n * n);
// => { a: [{ b: { c: 9 } }] }

// Update with array path
updateWith(object, ['a', 0, 'b', 'c'], n => n + 10);
// => { a: [{ b: { c: 13 } }] }
```

You can control the shape of intermediate objects created using a customizer.

```typescript
import { updateWith } from 'es-toolkit/compat';

const object = {};

// Use Object constructor as customizer (creates objects instead of arrays)
updateWith(object, '[0][1]', () => 'a', Object);
// => { '0': { '1': 'a' } }
// (default behavior would be { '0': ['a'] })
```

The customizer receives the value to create, key, and object as arguments.

```typescript
import { updateWith } from 'es-toolkit/compat';

const customizer = (value: any, key: string, object: any) => {
  // Create objects instead of arrays for numeric keys
  if (!isNaN(Number(key))) {
    return {};
  }
};

const result = {};
updateWith(result, '[0][1]', () => 'value', customizer);
// => { '0': { '1': 'value' } }
```

The customizer is not called if the path already exists.

```typescript
import { updateWith } from 'es-toolkit/compat';

const object = { a: { b: 1 } };
updateWith(object, 'a.b', n => n * 2, () => {
  console.log('Not called'); // Not called
  return {};
});
// => { a: { b: 2 } }
```

#### Parameters

- `obj` (`T`): The object to modify.
- `path` (`PropertyKey | readonly PropertyKey[]`): The path of the property to update. Can be specified as a string or array.
- `updater` (`(oldValue: any) => any`): A function that receives the existing value and returns the new value.
- `customizer` (`(value: any, key: string, object: T) => any`, optional): A function that returns the intermediate object to be created when the path doesn't exist. Returns `undefined` to use default behavior.

#### Returns

(`T`): Returns the modified object.
