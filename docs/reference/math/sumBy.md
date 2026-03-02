# sumBy

Calculates the sum of array elements using a transformation function.

```typescript
const total = sumBy(items, getValue);
```

## Usage

### `sumBy(items, getValue)`

Use `sumBy` when you want to convert each element of an array to a number and calculate the sum. It's useful for summing specific properties from an array of objects.

```typescript
import { sumBy } from 'es-toolkit/math';

// Sum a specific property from an array of objects
const products = [
  { name: 'laptop', price: 1000 },
  { name: 'mouse', price: 25 },
  { name: 'keyboard', price: 75 },
];
const totalPrice = sumBy(products, item => item.price);
console.log(totalPrice); // 1100

// Sum user ages
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];
const totalAge = sumBy(users, user => user.age);
console.log(totalAge); // 90

// Sum string lengths
const words = ['hello', 'world', 'test'];
const totalLength = sumBy(words, word => word.length);
console.log(totalLength); // 14
```

Complex calculations are also possible.

```typescript
import { sumBy } from 'es-toolkit/math';

// Sum with weighted scores
const scores = [
  { subject: 'math', score: 90, weight: 0.3 },
  { subject: 'english', score: 85, weight: 0.2 },
  { subject: 'science', score: 95, weight: 0.5 },
];
const weightedSum = sumBy(scores, item => item.score * item.weight);
console.log(weightedSum); // 91

// Sum lengths of arrays
const arrays = [[1, 2], [3, 4, 5], [6]];
const totalElements = sumBy(arrays, arr => arr.length);
console.log(totalElements); // 6

// Conditional calculation
const orders = [
  { id: 1, amount: 100, status: 'completed' },
  { id: 2, amount: 200, status: 'pending' },
  { id: 3, amount: 150, status: 'completed' },
];
const completedTotal = sumBy(orders, order => (order.status === 'completed' ? order.amount : 0));
console.log(completedTotal); // 250
```

Real-world use case examples.

```typescript
import { sumBy } from 'es-toolkit/math';

// Sum monthly sales
const monthlyReports = [
  { month: 'January', sales: 12000, expenses: 8000 },
  { month: 'February', sales: 15000, expenses: 9000 },
  { month: 'March', sales: 18000, expenses: 11000 },
];
const totalSales = sumBy(monthlyReports, report => report.sales);
const totalExpenses = sumBy(monthlyReports, report => report.expenses);
const totalProfit = totalSales - totalExpenses;
console.log(totalSales); // 45000
console.log(totalExpenses); // 28000
console.log(totalProfit); // 17000

// Calculate total score for averaging student grades
const students = [
  { name: 'Alice', tests: [85, 90, 88] },
  { name: 'Bob', tests: [92, 87, 95] },
  { name: 'Charlie', tests: [78, 85, 82] },
];
const totalTestScores = sumBy(students, student => student.tests.reduce((sum, score) => sum + score, 0));
console.log(totalTestScores); // 762
```

Empty arrays return 0.

```typescript
import { sumBy } from 'es-toolkit/math';

const emptyArray = [];
const result = sumBy(emptyArray, x => x.value);
console.log(result); // 0
```

#### Parameters

- `items` (`readonly T[]`): The array to calculate the sum from.
- `getValue` (`(element: T) => number`): A function that converts each element to a number.

#### Returns

(`number`): Returns the sum of values after applying the transformation function. Returns `0` for empty arrays.
