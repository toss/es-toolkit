# rangeRight

Creates an array of numbers in reverse order within a specified range and step.

```typescript
const numbers = rangeRight(end);
const numbers = rangeRight(start, end, step?);
```

## Reference

### `rangeRight(end)`

Use `rangeRight` when you need a consecutive array of numbers in reverse order from the end value to 0. It's like `range` but the result comes from the back.

```typescript
import { rangeRight } from 'es-toolkit/math';

// Create an array from 3 to 0 in reverse order.
const numbers1 = rangeRight(4);
console.log(numbers1); // [3, 2, 1, 0]

// Reverse indices of an array
const items = ['a', 'b', 'c', 'd', 'e'];
const reverseIndices = rangeRight(items.length);
reverseIndices.forEach(i => {
  console.log(items[i]); // Outputs 'e', 'd', 'c', 'b', 'a' in order
});
```

#### Parameters

- `end` (`number`): The end value (exclusive). Starts from 0.

#### Returns

(`number[]`): Returns a reverse array of numbers generated from the end value to 0.

### `rangeRight(start, end, step?)`

Use `rangeRight` when you need a consecutive array of numbers in reverse order with a specified start value, end value, and step. It's like `range` but the result comes from the back.

```typescript
import { rangeRight } from 'es-toolkit/math';

// Create an array from 4 to 1 in reverse order.
const numbers2 = rangeRight(1, 5);
console.log(numbers2); // [4, 3, 2, 1]

// Create an array from 15 to 0 with decrements of 5.
const numbers3 = rangeRight(0, 20, 5);
console.log(numbers3); // [15, 10, 5, 0]

// Can also go in the negative direction.
const numbers4 = rangeRight(-5, 0, 1);
console.log(numbers4); // [-1, -2, -3, -4, -5]

// Can go from smaller to larger numbers.
const numbers5 = rangeRight(5, 0, -1);
console.log(numbers5); // [1, 2, 3, 4, 5]
```

Useful when you need reverse order for countdowns or pagination.

```typescript
import { rangeRight } from 'es-toolkit/math';

// Create a countdown
const countdown = rangeRight(0, 11);
console.log(countdown); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

// Pagination from last page to first page
const pageNumbers = rangeRight(1, 11);
console.log(pageNumbers); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

#### Parameters

- `start` (`number`): The start value. Included in the result array.
- `end` (`number`): The end value. Not included in the result array.
- `step` (`number`, optional): The increment between each number. Must be a non-zero integer. Defaults to `1`.

#### Returns

(`number[]`): Returns a reverse array of numbers generated with the specified range and step.

#### Throws

- Throws an error if `step` is 0 or not an integer.
