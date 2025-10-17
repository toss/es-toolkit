# sample

Returns a randomly selected element from an array.

```typescript
const randomElement = sample(arr);
```

## Reference

### `sample(arr)`

Use `sample` when you want to randomly select one element from an array. It's useful for selecting random items in games, randomly fetching test data, or conducting draws.

```typescript
import { sample } from 'es-toolkit/array';

// Randomly select one from a number array.
const numbers = [1, 2, 3, 4, 5];
const randomNumber = sample(numbers);
// Returns: one of 1, 2, 3, 4, 5

// Randomly select one from a string array.
const fruits = ['apple', 'banana', 'cherry', 'date'];
const randomFruit = sample(fruits);
// Returns: one of 'apple', 'banana', 'cherry', 'date'

// Randomly select one from an object array.
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];
const randomUser = sample(users);
// Returns: one of the three users randomly
```

It can also be used with various types of arrays.

```typescript
import { sample } from 'es-toolkit/array';

// Boolean array
const booleans = [true, false];
const randomBoolean = sample(booleans);
// Returns: true or false

// Mixed type array
const mixed = [1, 'hello', { key: 'value' }, [1, 2, 3]];
const randomItem = sample(mixed);
// Returns: any of the elements in the array
```

#### Parameters

- `arr` (`readonly T[]`): The array from which to randomly select an element.

#### Returns

(`T`): A randomly selected element from the array.
