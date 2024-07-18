# fill

Fills elements of an array with a specified value from the start position up to, but not including, the end position.

This function mutates the original array and replaces its elements with the provided value, starting from the specified start index up to the end index (non-inclusive). If the start or end indices are not provided, it defaults to filling the entire array.

Negative indices can also be used, in which case they are calculated from the end of the array.

## Signature

```typescript
function fill<T>(array: unknown[], value: T): T[];
function fill<T, U>(array: T[], value: T, start: number): Array<T | U>;
function fill<T, U>(array: T[], value: T, start: number, end: number): Array<T | U>;
```

### Parameters

- `array` (`Array<T | U>`): The array to fill.
- `value` (`U`): The value to fill the array with.
- `start` (`number`, default = 0): The start position. Defaults to 0.
- `end` (`number`, default = array.length): The end position. Defaults to the array's length.

### Returns

(`Array<T | U>`): The array with the filled values.

## Examples

```typescript
const array1 = [1, 2, 3];
const result1 = fill(array1, 'a');
// result1 => ['a', 'a', 'a']

const array2 = Array(3);
const result2 = fill(array2, 2);
// result2 => [2, 2, 2]

const array3 = [4, 6, 8, 10];
const result3 = fill(array3, '*', 1, 3);
// result3 => [4, '*', '*', 10]

const array4 = [1, 2, 3];
const result4 = fill(array4, '*', -2, -1);
// result4 => [1, '*', 3]
```
