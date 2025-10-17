# updateWith (Lodash compatibility)

::: warning Use direct assignment

This `updateWith` function operates slowly due to complex path parsing and customizer handling.

Instead, use faster and more modern direct property assignment or optional chaining.

:::

Updates the value at the specified path of the object with an updater function, while controlling path creation with a customizer.

```typescript
const updated = updateWith(object, path, updater, customizer);
```

## Interface

```typescript
function updateWith<T extends object>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (oldValue: any) => any,
  customizer?: (value: any, key: string, object: T) => any
): T;
```

### Parameters

- `obj` (`T`): The object to modify.
- `path` (`PropertyKey | readonly PropertyKey[]`): The path of the property to update.
- `updater` (`(oldValue: any) => any`): The function to produce the updated value.
- `customizer` (`(value: any, key: string, object: T) => any`, optional): The function to customize the update process.

#### Returns

(`T`): The modified object.

## Examples

```typescript
import { updateWith } from 'es-toolkit/compat';

const object = {};

// Create custom path structure using customizer function
updateWith(object, '[0][1]', () => 'a', Object);
// => { '0': { '1': 'a' } }

// Customize path creation
updateWith(
  object,
  '[0][2]',
  () => 'b',
  value => {
    if (typeof value === 'number') {
      return [];
    }
  }
);
// => { '0': { '1': 'a', '2': 'b' } }
```
