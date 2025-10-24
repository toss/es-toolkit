# mean

Calculates the average of an array of numbers.

```typescript
const average = mean(nums);
```

## Reference

### `mean(nums)`

Use `mean` when you want to find the average value of an array of numbers. It calculates the average by adding all numbers together and dividing by the length of the array. If given an empty array, it returns `NaN`.

```typescript
import { mean } from 'es-toolkit/math';

// Calculate the average of an array of numbers
const numbers = [1, 2, 3, 4, 5];
const result = mean(numbers);
// result is 3 ((1 + 2 + 3 + 4 + 5) / 5 = 15 / 5 = 3)

// Calculate the average of decimal numbers
const decimals = [1.5, 2.5, 3.5];
const decimalResult = mean(decimals);
// decimalResult is 2.5

// Returns NaN for an empty array
const emptyResult = mean([]);
// emptyResult is NaN
```

#### Parameters

- `nums` (`readonly number[]`): An array of numbers to calculate the average.

#### Returns

(`number`): Returns the average of all numbers in the array. Returns `NaN` if the array is empty.
