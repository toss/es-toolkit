# unset (Lodash Compatibility)

::: warning Use the `delete` operator instead

This `unset` function operates slowly due to complex path parsing and nested object handling.

Use the faster and more modern `delete` operator directly instead.

:::

Removes the property at the specified path of the object.

```typescript
const success = unset(obj, path);
```

## Usage

### `unset(obj, path)`

Use `unset` when you want to delete a property at a specific path in a nested object. The path can be specified as a string or array.

```typescript
import { unset } from 'es-toolkit/compat';

// Remove nested property with string path
const obj = { a: { b: { c: 42 } } };
unset(obj, 'a.b.c'); // => true
console.log(obj); // { a: { b: {} } }

// Remove nested property with array path
const obj2 = { a: { b: { c: 42 } } };
unset(obj2, ['a', 'b', 'c']); // => true
console.log(obj2); // { a: { b: {} } }
```

You can also remove elements by array index.

```typescript
import { unset } from 'es-toolkit/compat';

const arr = [1, 2, 3, 4];
unset(arr, 1); // => true
console.log(arr); // [1, undefined, 3, 4] (element is deleted and becomes undefined)
```

Returns `true` even if the property doesn't exist or is already deleted.

```typescript
import { unset } from 'es-toolkit/compat';

const obj = { a: { b: 1 } };
unset(obj, 'a.c'); // => true (non-existent property)
```

`null` or `undefined` objects are handled safely.

```typescript
import { unset } from 'es-toolkit/compat';

unset(null, 'a.b'); // => true
unset(undefined, 'a.b'); // => true
```

#### Parameters

- `obj` (`any`): The object to modify.
- `path` (`PropertyKey | PropertyKey[]`): The path of the property to remove.

#### Returns

(`boolean`): Returns `true` if the property is deleted, otherwise returns `false`.
