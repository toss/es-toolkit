# unzipWith

Unzips an array of arrays, applying an `iteratee` function to regrouped elements.

## Signature

```typescript
function unzipWith<T, R>(target: T[][], iteratee: (...args: T[]) => R): R[];
```

### Parameters

- `target`(`T[][]`): The nested array to unzip. This is an array of arrays, where each inner array contains elements to be unzipped.
- `iteratee` (`(...args: T[]) => R`): A function to transform the unzipped elements.

### Returns

(`R[]`): A new array of unzipped and transformed elements.

## Examples

```typescript
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const result = unzipWith(nestedArray, (item, item2, item3) => item + item2 + item3);
// [9, 12]
```

## Compatibility with Lodash

Import `unzipWith` from `es-toolkit/compat` for full compatibility with Lodash.

The function supports the following features in compatibility mode:

- **Null/Undefined Handling**: When the input array is null or undefined, it returns an empty array.
- **Array-like Objects**: The function can work with array-like objects in addition to regular arrays.
- **Iteratee Function**: The iteratee function receives the regrouped elements as arguments and can transform them into any type. When the iteratee is null or undefined, the function behaves like `unzip`, returning the unzipped array without any transformation.

### Signature

```typescript
function unzipWith<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined): T[][];
function unzipWith<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined, iteratee?: null): T[][];
function unzipWith<T, R>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined, iteratee: (...args: T[]) => R): R[];
function unzipWith<T>(
  array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined,
  iteratee: (...args: any[]) => unknown
): any[];
```

### Examples

```typescript
// Example using iteratee
const array1 = [
  [1, 3],
  [2, 4],
];
const result1 = unzipWith(array1, (a, b) => a + b);
// result1 will be [3, 7] because when the iteratee is provided, the function transform regrouped elements.

// Example with null or undefined iteratee
const array2 = [
  [1, 3],
  [2, 4],
];
const result2 = unzipWith(array2, null);
// result2 will be [[1, 2], [3, 4]] because when the iteratee is null, the function behaves like unzip.

// Example with null or undefined input
const result3 = unzipWith(null);
// result3 will be [] since the input array is null.

// Example with array-like object
const arrayLike = { 0: [1, 2], 1: [3, 4], length: 2 };
const result4 = unzipWith(arrayLike, (a, b) => a + b);
// result4 will be [4, 6] since it works with array-like objects.
```
