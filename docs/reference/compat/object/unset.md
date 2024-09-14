# unset

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Removes the property at the given path of the object.

## Signature

```typescript
function unset(obj: unknown, path: PropertyKey | PropertyKey[]): boolean;
```

### Parameters

- `obj` (`unknown`): The object to modify.
- `path` (`PropertyKey | PropertyKey[]`): The path of the property to unset.

### Returns

(`boolean`): Returns true if the property is deleted, else false.

## Examples

```typescript
const obj = { a: { b: { c: 42 } } };
unset(obj, 'a.b.c'); // true
console.log(obj); // { a: { b: {} } }

const obj = { a: { b: { c: 42 } } };
unset(obj, ['a', 'b', 'c']); // true
console.log(obj); // { a: { b: {} } }
```
