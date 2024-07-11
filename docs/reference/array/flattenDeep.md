# flattenDeep

Flattens all depths of a nested array.

It works the same as if you called [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) as `flat(Infinity)` in the JavaScript language, but it's faster.

## Signature

```typescript
// Utility type for recursively unpacking nested array types to extract the type of the innermost element
type ExtractNestedArrayType<T> = T extends ReadonlyArray<infer U> ? ExtractNestedArrayType<U> : T;

function flattenDeep<T>(arr: T[]): Array<ExtractNestedArrayType<T>>;
```

### Parameters

- `arr` (`T[]`): The array to flatten.

### Returns

(`Array<ExtractNestedArrayType<T>>`): A new array with all depths flattened.

## Examples

```typescript
const array = [1, [2, [3]], [4, [5, 6]]];

const result = flattenDeep(array);
// Return [1, 2, 3, 4, 5, 6]
```
