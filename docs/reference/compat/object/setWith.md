# setWith

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Sets the value at the specified path of the given object using a customizer function for path creation. This method is similar to `set` except that it accepts a customizer for creating nested objects.

If the customizer returns `undefined`, path creation is handled by the method instead. The customizer is invoked with three arguments: (nsValue, key, nsObject).

## Signature

```typescript
function setWith<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  value: unknown,
  customizer?: (value: unknown) => unknown
): T;
```

### Parameters

- `obj` (`T`): The object to modify.
- `path` (`PropertyKey | readonly PropertyKey[]`): The path of the property to set.
- `value` (`unknown`): The value to set.
- `customizer` (`(value: unknown) => unknown`): The function to customize path creation.

### Returns

(`T`): Returns the modified object.

## Examples

```typescript
import { setWith } from 'es-toolkit/compat';
import { isObject } from 'es-toolkit/compat';

// Set a value in a nested array with a customizer
const object = {};
setWith(object, '[0][1][2]', 3, value => (isObject(value) ? undefined : {}));
console.log(object); // => { '0': { '1': { '2': 3 } } }

// Using Object as a customizer to create objects for arrays
const obj2 = {};
setWith(obj2, 'a[0].b.c', 4, Object);
console.log(obj2); // => { a: [{ b: { c: 4 } }] }

// Path creation without a customizer (same as using set)
const obj3 = {};
setWith(obj3, 'a.b.c', 4);
console.log(obj3); // => { a: { b: { c: 4 } } }
```
