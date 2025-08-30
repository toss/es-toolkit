# fromPairs

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Convert a two-dimensional array or Map into an object.

## Signature

```typescript
function fromPairs<T>(pairs: ArrayLike<[PropertyName, T]> | null | undefined): Record<string, T>;
function fromPairs(pairs: ArrayLike<any[]> | null | undefined): Record<string, any>;
```

### Parameters

- `pairs` (`ArrayLike<[PropertyName, T]> | ArrayLike<any[]> | null | undefined`): The two-dimensional array or Map to be converted. Each sub-array in the two-dimensional array should have two elements, with the first element as the key and the second as the value.

### Returns

(`Record<string, any> | Record<string, T>`): The converted object with the same keys and values as the input parameters.

## Examples

```typescript
const data = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const result = fromPairs(data);
// result will be { a: 1, b: 2, c: 3 }
```
