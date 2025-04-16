# at

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns an array of values corresponding to `paths` of `object`.

## Signature

```typescript
function at<T>(object: T, ...paths: Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>): unknown[];
```

### Parameters

- `object` (`T`): The object to iterate over.
- `...paths` (`Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>`): The property paths to pick. Each path can be a string, number, symbol, or an array of these types, or an array-like object.

### Returns

(`unknown[]`): Returns an array of values corresponding to the specified paths.

## Examples

```js
const object = { a: [{ b: { c: 3 } }, 4] };

at(object, ['a[0].b.c', 'a[1]']);
// => [3, 4]

// You can also provide paths as arguments
at(object, 'a[0].b.c', 'a[1]');
// => [3, 4]

// Works with arrays too
const array = [1, 2, 3];
at(array, 0, 2);
// => [1, 3]

// Returns undefined for nonexistent paths
at(object, 'a.b.c');
// => [undefined]

// Multiple paths get flattened if provided as an array
at(object, ['a[0].b.c', 'a[1]']);
// => [3, 4]
```
