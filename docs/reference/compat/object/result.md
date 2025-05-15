# result

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Retrieves the value at a given path of an object.

Works similarly to [get](./get.md), but if it encounters a function while traversing the path, it invokes that function and continues.

If the resolved value is `undefined`, it returns the default value. If the default value is a function, it invokes that function.

## Signature

```typescript
function result(object: any, path: PropertyKey | PropertyKey[], defaultValue?: any | ((...args: any[]) => any)): any;
```

### Parameters

- `object` (`any`): The object to query.
- `path` (`PropertyKey | PropertyKey[]`): The path of the property to get.
- `defaultValue` (`any`): The value returned if the resolved value is `undefined`.

### Returns

(`any`): Returns the resolved value.

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
