# shuffle

Returns a new array with the elements randomly shuffled.

```typescript
const shuffled = shuffle(arr);
```

## Usage

### `shuffle(arr)`

Use `shuffle` when you want to randomly shuffle the elements in an array. It uses the Fisher-Yates algorithm to ensure perfect random shuffling where all permutations appear with equal probability. It's useful for shuffling a deck in card games, randomizing quiz question order, or shuffling a playlist.

```typescript
import { shuffle } from 'es-toolkit/array';

// Shuffle a number array.
const numbers = [1, 2, 3, 4, 5];
const shuffledNumbers = shuffle(numbers);
// Returns: [3, 1, 4, 5, 2] (example, actually random)
console.log(numbers); // [1, 2, 3, 4, 5] (original is unchanged)

// Shuffle a string array.
const fruits = ['apple', 'banana', 'cherry', 'date'];
const shuffledFruits = shuffle(fruits);
// Returns: ['cherry', 'apple', 'date', 'banana'] (example, actually random)
```

You can shuffle various types of arrays.

```typescript
import { shuffle } from 'es-toolkit/array';

// Shuffle an object array.
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];
const shuffledUsers = shuffle(users);
// Returns: a new array with user objects shuffled in random order

// Shuffle a mixed type array.
const mixed = [1, 'hello', true, { key: 'value' }];
const shuffledMixed = shuffle(mixed);
// Returns: a new array with elements shuffled in random order
```

#### Parameters

- `arr` (`readonly T[]`): The array to shuffle.

#### Returns

(`T[]`): Returns a new array with elements shuffled in random order. The original array is not changed.
