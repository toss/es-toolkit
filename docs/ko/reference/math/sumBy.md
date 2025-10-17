# sumBy

변환 함수를 사용해서 배열 요소들의 합계를 계산해요.

```typescript
const total = sumBy(items, getValue);
```

## 레퍼런스

### `sumBy(items, getValue)`

배열의 각 요소를 숫자로 변환해서 합계를 구하고 싶을 때 `sumBy`를 사용하세요. 객체 배열에서 특정 속성의 합을 구할 때 유용해요.

```typescript
import { sumBy } from 'es-toolkit/math';

// 객체 배열에서 특정 속성의 합계
const products = [
  { name: 'laptop', price: 1000 },
  { name: 'mouse', price: 25 },
  { name: 'keyboard', price: 75 },
];
const totalPrice = sumBy(products, item => item.price);
console.log(totalPrice); // 1100

// 사용자 나이의 합계
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];
const totalAge = sumBy(users, user => user.age);
console.log(totalAge); // 90

// 문자열 길이의 합계
const words = ['hello', 'world', 'test'];
const totalLength = sumBy(words, word => word.length);
console.log(totalLength); // 14
```

복잡한 계산도 가능해요.

```typescript
import { sumBy } from 'es-toolkit/math';

// 점수에 가중치를 적용한 합계
const scores = [
  { subject: 'math', score: 90, weight: 0.3 },
  { subject: 'english', score: 85, weight: 0.2 },
  { subject: 'science', score: 95, weight: 0.5 },
];
const weightedSum = sumBy(scores, item => item.score * item.weight);
console.log(weightedSum); // 91

// 배열의 배열에서 길이의 합
const arrays = [[1, 2], [3, 4, 5], [6]];
const totalElements = sumBy(arrays, arr => arr.length);
console.log(totalElements); // 6

// 조건부 계산
const orders = [
  { id: 1, amount: 100, status: 'completed' },
  { id: 2, amount: 200, status: 'pending' },
  { id: 3, amount: 150, status: 'completed' },
];
const completedTotal = sumBy(orders, order => (order.status === 'completed' ? order.amount : 0));
console.log(completedTotal); // 250
```

실제 사용 예시들이에요.

```typescript
import { sumBy } from 'es-toolkit/math';

// 월별 매출 합계
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

// 학생들의 평균 점수 계산을 위한 총점
const students = [
  { name: 'Alice', tests: [85, 90, 88] },
  { name: 'Bob', tests: [92, 87, 95] },
  { name: 'Charlie', tests: [78, 85, 82] },
];
const totalTestScores = sumBy(students, student => student.tests.reduce((sum, score) => sum + score, 0));
console.log(totalTestScores); // 762
```

빈 배열은 0을 반환해요.

```typescript
import { sumBy } from 'es-toolkit/math';

const emptyArray = [];
const result = sumBy(emptyArray, x => x.value);
console.log(result); // 0
```

#### 파라미터

- `items` (`readonly T[]`): 합계를 계산할 배열이에요.
- `getValue` (`(element: T) => number`): 각 요소를 숫자로 변환하는 함수예요.

#### 반환 값

(`number`): 변환 함수를 적용한 값들의 합계를 반환해요. 빈 배열인 경우 `0`을 반환해요.
