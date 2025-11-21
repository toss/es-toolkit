# meanBy

Calculates the average of an array by applying the `getValue` function to each element.

```typescript
const average = meanBy(items, getValue);
```

## Usage

### `meanBy(items, getValue)`

Use `meanBy` when you want to find the average of the results of applying a function to each element of an array. It's useful for calculating the average of a specific property from an array of objects or for finding the average after transforming each element. If given an empty array, it returns `NaN`.

```typescript
import { meanBy } from 'es-toolkit/math';

// Calculate the average of a specific property from an array of objects
const people = [{ age: 23 }, { age: 25 }, { age: 27 }];
const averageAge = meanBy(people, person => person.age);
// averageAge is 25 ((23 + 25 + 27) / 3 = 75 / 3 = 25)

// Calculate the average of string lengths
const words = ['apple', 'banana', 'cherry'];
const averageLength = meanBy(words, word => word.length);
// averageLength is approximately 5.67 ((5 + 6 + 6) / 3 ≈ 5.67)

// Returns NaN for an empty array
const emptyResult = meanBy([], x => x);
// emptyResult is NaN
```

#### Parameters

- `items` (`readonly T[]`): An array to calculate the average.
- `getValue` (`(element: T) => number`): A function that selects a numeric value from each element.

#### Returns

(`number`): Returns the average of all values as determined by the `getValue` function. Returns `NaN` if the array is empty.
