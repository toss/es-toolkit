# medianBy

Calculates the median of an array by applying the `getValue` function to each element.

```typescript
const middle = medianBy(items, getValue);
```

## Usage

### `medianBy(items, getValue)`

Use `medianBy` when you want to find the median of the results of applying a function to each element of an array. It's useful for calculating the median of a specific property from an array of objects or for finding the median after transforming each element. For an array with an odd number of elements, it returns the exact middle value, and for an array with an even number of elements, it returns the average of the two middle values. If given an empty array, it returns `NaN`.

```typescript
import { medianBy } from 'es-toolkit/math';

// Calculate the median of a specific property from an array of objects (odd number)
const people = [{ age: 23 }, { age: 25 }, { age: 27 }, { age: 29 }, { age: 31 }];
const medianAge = medianBy(people, person => person.age);
// medianAge is 27 (the middle value in the sorted ages [23, 25, 27, 29, 31])

// Calculate the median of a specific property from an array of objects (even number)
const scores = [{ score: 80 }, { score: 90 }, { score: 85 }, { score: 95 }];
const medianScore = medianBy(scores, item => item.score);
// medianScore is 87.5 ((85 + 90) / 2 in the sorted scores [80, 85, 90, 95])

// Calculate the median of string lengths
const words = ['cat', 'elephant', 'dog', 'butterfly', 'ant'];
const medianLength = medianBy(words, word => word.length);
// medianLength is 3 (the middle value when lengths [3, 8, 3, 9, 3] are sorted to [3, 3, 3, 8, 9])

// Returns NaN for an empty array
const emptyResult = medianBy([], x => x);
// emptyResult is NaN
```

#### Parameters

- `items` (`readonly T[]`): An array to calculate the median.
- `getValue` (`(element: T) => number`): A function that selects a numeric value from each element.

#### Returns

(`number`): Returns the median of all values as determined by the `getValue` function. Returns `NaN` if the array is empty.
