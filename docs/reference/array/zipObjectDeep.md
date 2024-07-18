# zipObjectDeep

Creates a deeply nested object given arrays of paths and values.

This function takes two arrays: one containing arrays of property paths, and the other containing corresponding values.It returns a new object where paths from the first array are used as key paths to set values, with corresponding elements from the second array as values.Paths can be dot-separated strings or arrays of property names.If the `keys` array is longer than the `values` array, the remaining keys will have `undefined` as their values.

## Signature

```typescript
function zipObjectDeep<P extends string | number | symbol, V>(keys: P[], values: V[]): { [K in P]: V }
```

### Parameters

- `keys` (`P[]`): An array of property names.
- `values` (`V[]`): An array of values corresponding to the property names.

### Returns

(`{ [K in P]: V }`): A new object composed of the given property names and values.

## Examples

```typescript
const paths = ['a.b.c', 'd.e.f'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result will be { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

const paths = [['a', 'b', 'c'], ['d', 'e', 'f']];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result will be { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

const paths = ['a.b[0].c', 'a.b[1].d'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result will be { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
```
