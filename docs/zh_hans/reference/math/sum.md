# sum

返回数字数组中所有元素的总和。

```typescript
const total = sum(numbers);
```

## 用法

### `sum(nums)`

当您想要计算数字总和时使用 `sum`。它将数组中的所有数字相加以计算总和。

```typescript
import { sum } from 'es-toolkit/math';

// 基本数字求和
const numbers = [1, 2, 3, 4, 5];
const total = sum(numbers);
console.log(total); // 15

// 小数求和
const prices = [19.99, 25.5, 3.75];
const totalPrice = sum(prices);
console.log(totalPrice); // 49.24

// 负数和正数混合求和
const values = [-10, 5, -3, 8];
const result = sum(values);
console.log(result); // 0

// 单个数字数组
const single = [42];
const singleSum = sum(single);
console.log(singleSum); // 42
```

空数组和实际使用示例。

```typescript
import { sum } from 'es-toolkit/math';

// 空数组返回 0。
const empty = sum([]);
console.log(empty); // 0

// 计算分数总和
const scores = [85, 92, 78, 96, 88];
const totalScore = sum(scores);
const averageScore = totalScore / scores.length;
console.log(totalScore); // 439
console.log(averageScore); // 87.8

// 计算月销售额总和
const monthlySales = [12000, 15000, 18000, 14000, 16000];
const totalSales = sum(monthlySales);
console.log(totalSales); // 75000

// 计算购物车总金额
const cartItems = [29.99, 15.5, 8.75, 42.0];
const cartTotal = sum(cartItems);
console.log(cartTotal); // 96.24
```

计算结果可以与其他函数一起使用。

```typescript
import { sum } from 'es-toolkit/math';
import { round } from 'es-toolkit/math';

// 求和后四舍五入
const measurements = [1.234, 2.567, 3.891];
const total = sum(measurements);
const rounded = round(total, 2);
console.log(rounded); // 7.69

// 计算百分比
const votes = [45, 32, 23];
const totalVotes = sum(votes);
const percentages = votes.map(vote => round((vote / totalVotes) * 100, 1));
console.log(percentages); // [45.0, 32.0, 23.0]
```

#### 参数

- `nums` (`readonly number[]`): 要求和的数字数组。

#### 返回值

(`number`): 返回数组中所有数字的总和。对于空数组返回 `0`。
