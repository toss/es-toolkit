# toFilled

Creates a new array filled with a specified value from the start position up to, but not including, the end position.

If the start or end indices are not provided, it defaults to filling the entire array.

Negative indices can also be used, in which case they are counted from the end of the array.

## Interface

```typescript
function toFilled<T, U>(arr: T[], value: U): Array<T | U>;
function toFilled<T, U>(arr: T[], value: U, start: number): Array<T | U>;
function toFilled<T, U>(arr: T[], value: U, start: number, end: number): Array<T | U>;
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
