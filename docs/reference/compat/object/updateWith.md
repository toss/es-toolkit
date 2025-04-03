# updateWith

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities.
:::

Updates the value at the specified path of the given object using an updater function and a customizer. If any part of the path doesn't exist, it will be created according to the customizer function.

## Signature

```typescript
function updateWith<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (value: unknown) => unknown,
  customizer: (value: unknown) => unknown
): T;
```

### Parameters

- `obj` (`T`): The object to modify.
- `path` (`PropertyKey | readonly PropertyKey[]`): The path of the property to update.
- `updater` (`(value: unknown) => unknown`): The function to produce the updated value.
- `customizer` (`(value: unknown) => unknown`): The function to customize the update process.

### Returns

(`T`): The modified object.

## Examples

```typescript
import { updateWith } from 'es-toolkit/compat/object/updateWith';

const object = { a: [{ b: { c: 3 } }] };

// Use a customizer function to create custom path structures
updateWith(object, '[0].a.b.c', n => (n as number) + 1, customizer);
// => { '0': { a: { b: { c: 4 } } }, a: [{ b: { c: 3 } }] }

function customizer(value: unknown) {
  if (value == null) {
    return {};
  }
  return value;
}
```
