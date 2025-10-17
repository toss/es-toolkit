# sumBy

使用转换函数计算数组元素的总和。

```typescript
const total = sumBy(items, getValue);
```

## 参考

### `sumBy(items, getValue)`

当您想将数组的每个元素转换为数字并计算总和时使用 `sumBy`。它在从对象数组中求特定属性的总和时很有用。

```typescript
import { sumBy } from 'es-toolkit/math';

// 从对象数组中求特定属性的总和
const products = [
  { name: 'laptop', price: 1000 },
  { name: 'mouse', price: 25 },
  { name: 'keyboard', price: 75 }
];
const totalPrice = sumBy(products, item => item.price);
console.log(totalPrice); // 1100

// 用户年龄总和
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];
const totalAge = sumBy(users, user => user.age);
console.log(totalAge); // 90

// 字符串长度总和
const words = ['hello', 'world', 'test'];
const totalLength = sumBy(words, word => word.length);
console.log(totalLength); // 14
```

也可以进行复杂的计算。

```typescript
import { sumBy } from 'es-toolkit/math';

// 加权分数总和
const scores = [
  { subject: 'math', score: 90, weight: 0.3 },
  { subject: 'english', score: 85, weight: 0.2 },
  { subject: 'science', score: 95, weight: 0.5 }
];
const weightedSum = sumBy(scores, item => item.score * item.weight);
console.log(weightedSum); // 91

// 数组的数组中长度的总和
const arrays = [[1, 2], [3, 4, 5], [6]];
const totalElements = sumBy(arrays, arr => arr.length);
console.log(totalElements); // 6

// 条件计算
const orders = [
  { id: 1, amount: 100, status: 'completed' },
  { id: 2, amount: 200, status: 'pending' },
  { id: 3, amount: 150, status: 'completed' }
];
const completedTotal = sumBy(orders, order =>
  order.status === 'completed' ? order.amount : 0
);
console.log(completedTotal); // 250
```

实际使用示例。

```typescript
import { sumBy } from 'es-toolkit/math';

// 月销售额总和
const monthlyReports = [
  { month: 'January', sales: 12000, expenses: 8000 },
  { month: 'February', sales: 15000, expenses: 9000 },
  { month: 'March', sales: 18000, expenses: 11000 }
];
const totalSales = sumBy(monthlyReports, report => report.sales);
const totalExpenses = sumBy(monthlyReports, report => report.expenses);
const totalProfit = totalSales - totalExpenses;
console.log(totalSales); // 45000
console.log(totalExpenses); // 28000
console.log(totalProfit); // 17000

// 计算学生平均成绩的总分
const students = [
  { name: 'Alice', tests: [85, 90, 88] },
  { name: 'Bob', tests: [92, 87, 95] },
  { name: 'Charlie', tests: [78, 85, 82] }
];
const totalTestScores = sumBy(students, student =>
  student.tests.reduce((sum, score) => sum + score, 0)
);
console.log(totalTestScores); // 762
```

空数组返回 0。

```typescript
import { sumBy } from 'es-toolkit/math';

const emptyArray = [];
const result = sumBy(emptyArray, x => x.value);
console.log(result); // 0
```

#### 参数

- `items` (`readonly T[]`): 要计算总和的数组。
- `getValue` (`(element: T) => number`): 将每个元素转换为数字的函数。

#### 返回值

(`number`): 返回应用转换函数后的值的总和。对于空数组返回 `0`。
