# propertyOf

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that returns the value at a given path of an object.

Unlike [`property`](./property.md), which creates a function bound to a specific path and allows you to query different objects,
`propertyOf` creates a function bound to a specific object and allows you to query different paths within that object.

## Signature

```typescript
function propertyOf(object: unknown): (path: PropertyKey | PropertyKey[]) => unknown;
```

### Parameters

- `object` (`unknown`): The object to query.

### Returns

(`(path: PropertyKey | PropertyKey[]) => unknown`): Returns a new function that takes a path and retrieves the value from the object at the specified path.

## Examples

```typescript
const getValue = propertyOf({ a: { b: { c: 3 } } });
const result = getValue('a.b.c');
console.log(result); // => 3

const getValue = propertyOf({ a: { b: { c: 3 } } });
const result = getValue(['a', 'b', 'c']);
console.log(result); // => 3
```
