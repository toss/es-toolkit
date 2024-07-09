# flatten

Flattens the nested array given as an argument to the desired depth.

It behaves the same as and returns the same type as the built-in [Array.prototype.flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) provided by JavaScript, but with superior performance.

## Signature

```typescript
function flatten<T, D extends number = 1>(arr: T[], depth?: D): FlatArray<T[], D>[];
```

### Parameters

- `arr` (`T[]`):The array to flatten.
- `depth` (`D`): The depth to flatten, which defaults to 1.

### Returns

(`FlatArray<T[], D>[]`) A new array that has been flattened.

## Examples

```typescript
const originArr = [1, [2, 3], [4, [5, 6]]];

const array1 = flatten(originArr);
// Return [1, 2, 3, 4, [5, 6]]

const array2 = flatten(originArr, 1);
// Return [1, 2, 3, 4, [5, 6]]

const array3 = flatten(originArr, 2);
// Return [1, 2, 3, 4, 5, 6]
```
