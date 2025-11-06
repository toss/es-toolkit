# pullAt (Lodash Compatibility)

::: warning Use [pullAt](../../array/pullAt.md) from `es-toolkit` instead

This `pullAt` function operates slowly due to complex type handling and overloading.

Use the faster and more modern [pullAt](../../array/pullAt.md) from `es-toolkit` instead.

:::

Removes elements at specified indexes from an array and returns the removed elements.

```typescript
const removed = pullAt(array, ...indexes);
```

## Usage

### `pullAt(array, ...indexes)`

Removes elements at specified indexes from an array and returns an array of the removed elements. The original array is modified.

```typescript
import { pullAt } from 'es-toolkit/compat';

// Remove by individual indexes
const array = [1, 2, 3, 4, 5];
const removed = pullAt(array, 1, 3);
console.log(array); // [1, 3, 5]
console.log(removed); // [2, 4]

// Remove by array of indexes
const colors = ['red', 'green', 'blue', 'yellow'];
const removedColors = pullAt(colors, [0, 2]);
console.log(colors); // ['green', 'yellow']
console.log(removedColors); // ['red', 'blue']
```

Non-existent indexes are treated as `undefined`.

```typescript
import { pullAt } from 'es-toolkit/compat';

const numbers = [10, 20, 30];
const removed = pullAt(numbers, 1, 5);
console.log(numbers); // [10, 30]
console.log(removed); // [20, undefined]
```

#### Parameters

- `array` (`ArrayLike<T>`): The array to modify.
- `...indexes` (`Array<number | number[]>`): The indexes of elements to remove. Can pass individual numbers or arrays of numbers.

#### Returns

(`ArrayLike<T>`): Returns an array of removed elements.
