# unset (Lodash compatibility)

::: warning Use the `delete` operator

This `unset` function operates slowly due to complex path parsing and nested object handling.

Instead, use the faster and more modern `delete` operator directly.

:::

Removes the property at the specified path of the object.

```typescript
const success = unset(object, path);
```

## Interface

```typescript
function unset(obj: any, path: PropertyKey | PropertyKey[]): boolean;
```

### Parameters

- `obj` (`any`): The object to modify.
- `path` (`PropertyKey | PropertyKey[]`): The path of the property to remove.

#### Returns

(`boolean`): Returns true if the property is deleted, false otherwise.

## Examples

```typescript
const obj = { a: { b: { c: 42 } } };
unset(obj, 'a.b.c'); // true
console.log(obj); // { a: { b: {} } }

const obj = { a: { b: { c: 42 } } };
unset(obj, ['a', 'b', 'c']); // true
console.log(obj); // { a: { b: {} } }
```
