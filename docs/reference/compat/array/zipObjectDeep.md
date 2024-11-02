# zipObjectDeep

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a deeply nested object given arrays of paths and values.

This function takes two arrays: one containing arrays of property paths, and the other containing corresponding values.
It returns a new object where paths from the first array are used as key paths to set values, with corresponding elements from the second array as values.
Paths can be dot-separated strings or arrays of property names. If the `keys` array is longer than the `values` array, the remaining keys will have `undefined` as their values.

## Signature

```typescript
function zipObjectDeep<P extends PropertyKey, V>(keys: ArrayLike<P | P[]>, values: ArrayLike<V>): { [K in P]: V };
```

### Parameters

- `keys` (`ArrayLike<P | P[]>`): An array of property names.
- `values` (`ArrayLike<V>`): An array of values corresponding to the property names.

### Returns

(`{ [K in P]: V }`): A new object composed of the given property names and values.

## Examples

```typescript
import { zipObjectDeep } from 'es-toolkit/compat';

const paths = ['a.b.c', 'd.e.f'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result will be { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

const paths = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result will be { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

const paths = ['a.b[0].c', 'a.b[1].d'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result will be { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
```

## Performance Comparison

|                   | [Bundle Size](../../../bundle-size.md) | [Performance](../../../performance.md) |
| ----------------- | -------------------------------------- | -------------------------------------- |
| es-toolkit/compat | 938 bytes (88% smaller)                | 1,102,767 times (25% slower)           |
| lodash-es         | 7,338 bytes                            | 1,476,660 times                        |
