# update (Lodash Compatibility)

::: warning Use direct assignment instead

This `update` function operates slowly due to complex path parsing and nested object creation logic.

Use faster and more modern direct property assignment or optional chaining instead.

:::

Updates the value at the specified path of the object with an updater function.

```typescript
const updated = update(obj, path, updater);
```

## Usage

### `update(obj, path, updater)`

Use `update` when you want to transform a value at a specific path in a nested object with a function. If the path doesn't exist, it will be created automatically.

```typescript
import { update } from 'es-toolkit/compat';

// Transform nested property value
const object = { a: [{ b: { c: 3 } }] };
update(object, 'a[0].b.c', n => (n as number) * 2);
// => { a: [{ b: { c: 6 } }] }

// Update with array path
update(object, ['a', 0, 'b', 'c'], n => (n as number) + 10);
// => { a: [{ b: { c: 13 } }] }
```

If the path doesn't exist, the necessary nested structure is created automatically.

```typescript
import { update } from 'es-toolkit/compat';

// Create nested structure in empty object
update({}, 'a.b.c', () => 'hello');
// => { a: { b: { c: 'hello' } } }

// Arrays are also created automatically
update({}, 'a.b[0]', () => 'value');
// => { a: { b: ['value'] } }
```

You can calculate new values based on existing values.

```typescript
import { update } from 'es-toolkit/compat';

const stats = { score: 100 };
update(stats, 'score', score => score * 1.1); // Increase by 10%
// => { score: 110 }
```

#### Parameters

- `obj` (`object`): The object to modify.
- `path` (`PropertyKey | PropertyKey[]`): The path of the property to update. Can be specified as a string or array.
- `updater` (`(value: any) => any`): A function that receives the existing value and returns the new value.

#### Returns

(`any`): Returns the modified object.
