# flatten

Flattens the nested array given as an argument to the desired depth.

It works the same as [Array.prototype.flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) provided by default in JavaScript and returns the same type. However, its performance is superior.

## Signature

```typescript
function flatten<T, D extends number = 1>(arr: T[], depth?: D): Array<FlatArray<T[], D>>;
```

### Parameters

- `arr` (`T[]`):The array to flatten.
- `depth` (`D`): The depth to flatten, which defaults to 1.

### Returns

(`Array<FlatArray<T[], D>>`) A new array that has been flattened.

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
