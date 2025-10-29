# sumBy

変換関数を使用して配列要素の合計を計算します。

```typescript
const total = sumBy(items, getValue);
```

## 参照

### `sumBy(items, getValue)`

配列の各要素を数値に変換して合計を求めたい場合は `sumBy` を使用してください。オブジェクト配列から特定のプロパティの合計を求める際に便利です。

```typescript
import { sumBy } from 'es-toolkit/math';

// オブジェクト配列から特定のプロパティの合計
const products = [
  { name: 'laptop', price: 1000 },
  { name: 'mouse', price: 25 },
  { name: 'keyboard', price: 75 },
];
const totalPrice = sumBy(products, item => item.price);
console.log(totalPrice); // 1100

// ユーザーの年齢の合計
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];
const totalAge = sumBy(users, user => user.age);
console.log(totalAge); // 90

// 文字列長の合計
const words = ['hello', 'world', 'test'];
const totalLength = sumBy(words, word => word.length);
console.log(totalLength); // 14
```

複雑な計算も可能です。

```typescript
import { sumBy } from 'es-toolkit/math';

// 重み付けスコアの合計
const scores = [
  { subject: 'math', score: 90, weight: 0.3 },
  { subject: 'english', score: 85, weight: 0.2 },
  { subject: 'science', score: 95, weight: 0.5 },
];
const weightedSum = sumBy(scores, item => item.score * item.weight);
console.log(weightedSum); // 91

// 配列の配列から長さの合計
const arrays = [[1, 2], [3, 4, 5], [6]];
const totalElements = sumBy(arrays, arr => arr.length);
console.log(totalElements); // 6

// 条件付き計算
const orders = [
  { id: 1, amount: 100, status: 'completed' },
  { id: 2, amount: 200, status: 'pending' },
  { id: 3, amount: 150, status: 'completed' },
];
const completedTotal = sumBy(orders, order => (order.status === 'completed' ? order.amount : 0));
console.log(completedTotal); // 250
```

実際の使用例です。

```typescript
import { sumBy } from 'es-toolkit/math';

// 月次売上の合計
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

// 学生の平均点数計算のための総点
const students = [
  { name: 'Alice', tests: [85, 90, 88] },
  { name: 'Bob', tests: [92, 87, 95] },
  { name: 'Charlie', tests: [78, 85, 82] },
];
const totalTestScores = sumBy(students, student => student.tests.reduce((sum, score) => sum + score, 0));
console.log(totalTestScores); // 762
```

空配列は0を返します。

```typescript
import { sumBy } from 'es-toolkit/math';

const emptyArray = [];
const result = sumBy(emptyArray, x => x.value);
console.log(result); // 0
```

#### パラメータ

- `items` (`readonly T[]`): 合計を計算する配列です。
- `getValue` (`(element: T) => number`): 各要素を数値に変換する関数です。

#### 戻り値

(`number`): 変換関数を適用した値の合計を返します。空配列の場合は `0` を返します。
