# update (Lodash Compatibility)

::: warning Use direct assignment instead

This `update` function operates slowly due to complex path parsing and nested object creation logic.

Use faster and more modern direct property assignment or optional chaining instead.

:::

Updates the value at the specified path of the object with an updater function.

```typescript
const updated = update(object, path, updater);
```

## Interface

```typescript
function update<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (value: unknown) => unknown
): T;
```

### Parameters

- `obj` (`T`): The object to modify.
- `path` (`PropertyKey | readonly PropertyKey[]`): The path of the property to update.
- `updater` (`(value: unknown) => unknown`): The function to produce the updated value.

### Returns

(`T`): The modified object.

## Examples

```typescript
import { update } from 'es-toolkit/compat';

const object = { a: [{ b: { c: 3 } }] };

// Update a value using an updater function
update(object, 'a[0].b.c', n => (n as number) * 2);
// => { a: [{ b: { c: 6 } }] }

// Create a value if the path doesn't exist
update({}, 'a.b[0]', () => 'c');
// => { a: { b: ['c'] } }
```
