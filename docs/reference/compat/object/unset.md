# unset (Lodash Compatibility)

::: warning Use the `delete` operator instead

This `unset` function operates slowly due to complex path parsing and nested object handling.

Use the faster and more modern `delete` operator directly instead.

:::

Removes the property at the specified path of the object.

```typescript
const success = unset(object, path);
```

## Interface

```typescript
function unset(obj: unknown, path: PropertyKey | PropertyKey[]): boolean;
```

### Parameters

- `obj` (`unknown`): The object to modify.
- `path` (`PropertyKey | PropertyKey[]`): The path of the property to remove.

### Returns

(`boolean`): Returns true if the property is deleted, else false.
string.

## Examples

```typescript
const obj = { a: { b: { c: 42 } } };
unset(obj, 'a.b.c'); // true
console.log(obj); // { a: { b: {} } }

const obj = { a: { b: { c: 42 } } };
unset(obj, ['a', 'b', 'c']); // true
console.log(obj); // { a: { b: {} } }
```
