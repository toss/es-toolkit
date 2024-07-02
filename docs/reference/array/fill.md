# fill

Fills elements of an array with a specified value from the start position up to, but not including, the end position.

This function mutates the original array and replaces its elements with the provided value, starting from the specified start index up to the end index (non-inclusive). If the start or end indices are not provided, it defaults to filling the entire array.

## Signature

```typescript
function fill<T>(array: unknown[], value: T): T[];
function fill<T, P>(array: T[], value: P, start: number): Array<T | P>;
function fill<T, P>(array: T[], value: P, start: number, end: number): Array<T | P>;
```

### Parameters

- `array` (`Array<T | P>`): The array to fill.
- `value` (`P`): The value to fill the array with.
- `start` (`number`, default = 0): The start position. Defaults to 0.
- `end` (`number`, default = array.length): The end position. Defaults to the array's length.

### Returns

(`Array<T | P>`): The array with the filled values.

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
```
