# flatMap

Map each element of a nested array to a given iteratee function, then flatten it to the desired depth.

It works the same as if you called [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) with [Array#map](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map) as `map(iteratee).flat(depth)` in the JavaScript language, but it's faster.

## Signature

```typescript
function flatMap<T, U, D extends number = 1>(
  arr: readonly T[],
  iteratee: (item: T) => U,
  depth?: D
): Array<FlatArray<U[], D>>;
```

### Parameters

- `arr` (`T[]`): The array to flatten.
- `iteratee` (`T[]`): A function that maps each array element.
- `depth` (`D`): The depth to flatten, which defaults to 1.

### Returns

(`Array<FlatArray<U[], D>>`): A new array with each element mapped and flattened to the desired depth.

## Examples

```typescript
const array = [1, 2, 3];

const result1 = flatMap(array, item => [item, item], 1);
// Return [1, 1, 2, 2, 3, 3]

const result2 = flatMap(array, item => [[item, item]], 2);
// Return [1, 1, 2, 2, 3, 3]

const result3 = flatMap(array, item => [[[item, item]]], 3);
// Return [1, 1, 2, 2, 3, 3]
```
