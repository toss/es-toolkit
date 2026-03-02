# sum

Returns the sum of all elements in an array of numbers.

```typescript
const total = sum(numbers);
```

## Usage

### `sum(nums)`

Use `sum` when you want to calculate the total of numbers. It adds up all numbers in an array to compute the sum.

```typescript
import { sum } from 'es-toolkit/math';

// Basic number sum
const numbers = [1, 2, 3, 4, 5];
const total = sum(numbers);
console.log(total); // 15

// Sum of decimal numbers
const prices = [19.99, 25.5, 3.75];
const totalPrice = sum(prices);
console.log(totalPrice); // 49.24

// Sum with negative and positive numbers mixed
const values = [-10, 5, -3, 8];
const result = sum(values);
console.log(result); // 0

// Single number array
const single = [42];
const singleSum = sum(single);
console.log(singleSum); // 42
```

Empty arrays and real-world examples.

```typescript
import { sum } from 'es-toolkit/math';

// Empty array returns 0.
const empty = sum([]);
console.log(empty); // 0

// Calculate score total
const scores = [85, 92, 78, 96, 88];
const totalScore = sum(scores);
const averageScore = totalScore / scores.length;
console.log(totalScore); // 439
console.log(averageScore); // 87.8

// Calculate monthly sales total
const monthlySales = [12000, 15000, 18000, 14000, 16000];
const totalSales = sum(monthlySales);
console.log(totalSales); // 75000

// Calculate shopping cart total
const cartItems = [29.99, 15.5, 8.75, 42.0];
const cartTotal = sum(cartItems);
console.log(cartTotal); // 96.24
```

Calculation results can be used with other functions.

```typescript
import { sum } from 'es-toolkit/math';
import { round } from 'es-toolkit/math';

// Round after summing
const measurements = [1.234, 2.567, 3.891];
const total = sum(measurements);
const rounded = round(total, 2);
console.log(rounded); // 7.69

// Calculate percentages
const votes = [45, 32, 23];
const totalVotes = sum(votes);
const percentages = votes.map(vote => round((vote / totalVotes) * 100, 1));
console.log(percentages); // [45.0, 32.0, 23.0]
```

#### Parameters

- `nums` (`readonly number[]`): The array of numbers to sum.

#### Returns

(`number`): Returns the sum of all numbers in the array. Returns `0` for empty arrays.
