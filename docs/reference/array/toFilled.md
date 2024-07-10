# toFilled

Creates a new array filled with the specified value at specified positions. This function does not mutate the original array.

This function generates a new array based on the given array and fills the elements from the start position to the end position with the specified value. If the start or end positions are not provided, the entire array is filled.

Negative indices can also be used, in which case they are counted from the end of the array.

## Interface

```typescript
export function toFilled<T, U>(arr: T[], value: U): Array<T | U>;
export function toFilled<T, U>(arr: T[], value: U, start: number): Array<T | U>;
export function toFilled<T, U>(arr: T[], value: U, start: number, end: number): Array<T | U>;
```

### Parameters

- `arr` (`Array<T>`): The array to base the new array on.
- `value` (`U`): The value to fill the new array with.
- `start` (`number, default = 0`): The start position. Defaults to 0.
- `end` (`number, default = array.length`): The end position. Defaults to the array's length.

### Return Value

(`Array<T | U>`): A new array with the specified values filled in.

### Examples

```typescript
const array = [1, 2, 3, 4, 5];

let result = toFilled(array, '*', 2);
console.log(result); // [1, 2, '*', '*', '*']
console.log(array); // [1, 2, 3, 4, 5]

result = toFilled(array, '*', 1, 4);
console.log(result); // [1, '*', '*', '*', 5]
console.log(array); // [1, 2, 3, 4, 5]

result = toFilled(array, '*');
console.log(result); // ['*', '*', '*', '*', '*']
console.log(array); // [1, 2, 3, 4, 5]

result = toFilled(array, '*', -4, -1);
console.log(result); // [1, '*', '*', '*', 5]
console.log(array); // [1, 2, 3, 4, 5]
```
