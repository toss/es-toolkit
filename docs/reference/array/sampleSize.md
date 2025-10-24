# sampleSize

Returns a new array of randomly selected elements with the specified size.

```typescript
const sampled = sampleSize(array, size);
```

## Reference

### `sampleSize(array, size)`

Use `sampleSize` when you want to randomly sample multiple elements from an array. It uses Floyd's algorithm to efficiently generate random samples without duplicates. It's useful for extracting samples in surveys or randomly selecting multiple items in games.

```typescript
import { sampleSize } from 'es-toolkit/array';

// Randomly select 3 from a number array.
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const randomNumbers = sampleSize(numbers, 3);
// Returns: [2, 7, 9] (example, actually random)

// Randomly select 2 from a string array.
const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
const randomFruits = sampleSize(fruits, 2);
// Returns: ['cherry', 'apple'] (example, actually random)
```

You can sample with various sizes.

```typescript
import { sampleSize } from 'es-toolkit/array';

const items = ['a', 'b', 'c', 'd', 'e'];

// Select 1 element
const single = sampleSize(items, 1);
// Returns: ['c'] (example)

// Select same as entire array size (shuffle effect)
const all = sampleSize(items, 5);
// Returns: ['b', 'd', 'a', 'e', 'c'] (example)

// Select empty array
const none = sampleSize(items, 0);
// Returns: []
```

#### Parameters

- `array` (`readonly T[]`): The array to sample from.
- `size` (`number`): The number of elements to select.

#### Returns

(`T[]`): Returns a new array consisting of randomly selected elements.

#### Throws

Throws an error if `size` is greater than the length of the array.
