# result

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Retrieves the value at a given path of an object.
If the resolved value is a function, it is invoked with the object as its `this` context.
If the value is `undefined`, the `defaultValue` is returned.

## Signature

```typescript
function result<T>(
  object: unknown,
  path: string | number | symbol | ReadonlyArray<string | number | symbol>,
  defaultValue?: T | ((...args: unknown[]) => T)
): T;
```

### Parameters

- `object` (`unknown`): The object to query.
- `path` (`string | number | symbol | ReadonlyArray<string | number | symbol>`): The path of the property to get.
- `defaultValue` (`T | ((...args: unknown[]) => T)`): The value returned if the resolved value is `undefined`.

### Returns

(`T`): Returns the resolved value.

## Examples

```typescript
const obj = { a: { b: { c: 3 } } };
result(obj, 'a.b.c');
// => 3

const obj = { a: () => 5 };
result(obj, 'a');
// => 5 (calls the function `a` and returns its result)

const obj = { a: { b: null } };
result(obj, 'a.b.c', 'default');
// => 'default'

const obj = { a: { b: { c: 3 } } };
result(obj, 'a.b.d', () => 'default');
// => 'default'
```
