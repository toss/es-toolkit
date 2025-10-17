# range

Creates an array of numbers within a specified range and step.

```typescript
const numbers = range(end);
const numbers = range(start, end, step);
```

## Reference

### `range(end)`

Use `range` when you need a consecutive array of numbers from 0 to a specified end value. It's useful for loops.

```typescript
import { range } from 'es-toolkit/math';

// Create an array from 0 to 3.
const numbers1 = range(4);
console.log(numbers1); // [0, 1, 2, 3]

// Indices for an array with 10 elements
const indices = range(10);
console.log(indices); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// Can be used instead of forEach.
range(5).forEach(i => {
  console.log(`Iteration ${i}`); // Iteration 0, Iteration 1, Iteration 2, Iteration 3, Iteration 4
});
```

#### Parameters

- `end` (`number`): The end value (exclusive). Starts from 0.

#### Returns

(`number[]`): Returns an array of numbers generated from 0 to the end value.

### `range(start, end, step?)`

Use `range` when you need a consecutive array of numbers with a specified start value, end value, and step. It's useful for loops.

```typescript
import { range } from 'es-toolkit/math';

// Create an array from 1 to 4.
const numbers2 = range(1, 5);
console.log(numbers2); // [1, 2, 3, 4]

// Create an array from 0 to 20 with increments of 5.
const numbers3 = range(0, 20, 5);
console.log(numbers3); // [0, 5, 10, 15]

// Can also go in the negative direction.
const numbers4 = range(0, -5, -1);
console.log(numbers4); // [0, -1, -2, -3, -4]

// Can go from larger to smaller numbers.
const numbers5 = range(5, 0, -1);
console.log(numbers5); // [5, 4, 3, 2, 1]

// Create page numbers in a specific range
const pageNumbers = range(1, 11);
console.log(pageNumbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

#### Parameters

- `start` (`number`): The start value. Included in the result array.
- `end` (`number`): The end value. Not included in the result array.
- `step` (`number`, optional): The increment between each number. Must be a non-zero integer. Defaults to `1`.

#### Returns

(`number[]`): Returns an array of numbers generated with the specified range and step.

#### Throws

- Throws an error if `step` is 0 or not an integer.
