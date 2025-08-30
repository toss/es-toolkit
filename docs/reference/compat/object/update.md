# update

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Updates the value at the specified path of the given object using an updater function. If any part of the path doesn't exist, it will be created.

## Signature

```typescript
function update(obj: object, path: PropertyKey | PropertyKey[], updater: (value: any) => any): any;
```

### Parameters

- `obj` (`object`): The object to modify.
- `path` (`PropertyKey | PropertyKey[]`): The path of the property to update.
- `updater` (`(value: any) => any`): The function to produce the updated value.

### Returns

(`any`): The modified object.

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
