# flatMapDeep

Map each element of a nested array to the given iteratee function, then unpack and flatten all depths.

It works the same as if you called [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) with [Array#map](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map) as `map(iteratee).flat(Infinity)` in the JavaScript language, but it's faster.

## Signature

```typescript
function flattenDeep<T>(arr: T[]): Array<ExtractNestedArrayType<T>>;
```

### Parameters

- `arr` (`T[]`): The array to flatten.
- `iteratee` (`T[]`): A function that maps each array element.

### Returns

(`Array<ExtractNestedArrayType<T>>`): A new array with each element mapped and all depths flattened.

## Examples

```typescript
const array = [1, 2, 3];

const result1 = flatMapDeep(array, item => [item, item]);
// Return [1, 1, 2, 2, 3, 3]

const result2 = flatMapDeep(array, item => [[item, item]]);
// Return [1, 1, 2, 2, 3, 3]

const result3 = flatMapDeep(array, item => [[[item, item]]]);
// Return [1, 1, 2, 2, 3, 3]
```
