# sum

数値配列のすべての要素を足した合計を返します。

```typescript
const total = sum(numbers);
```

## 参照

### `sum(nums)`

数値の合計を求めたい場合は `sum` を使用してください。配列のすべての数値を足して合計を計算します。

```typescript
import { sum } from 'es-toolkit/math';

// 基本的な数値の合計
const numbers = [1, 2, 3, 4, 5];
const total = sum(numbers);
console.log(total); // 15

// 小数の合計
const prices = [19.99, 25.5, 3.75];
const totalPrice = sum(prices);
console.log(totalPrice); // 49.24

// 負の数と正の数が混在した合計
const values = [-10, 5, -3, 8];
const result = sum(values);
console.log(result); // 0

// 単一の数値配列
const single = [42];
const singleSum = sum(single);
console.log(singleSum); // 42
```

空配列と実際の使用例です。

```typescript
import { sum } from 'es-toolkit/math';

// 空配列は0を返します。
const empty = sum([]);
console.log(empty); // 0

// スコアの合計を計算
const scores = [85, 92, 78, 96, 88];
const totalScore = sum(scores);
const averageScore = totalScore / scores.length;
console.log(totalScore); // 439
console.log(averageScore); // 87.8

// 月次売上の合計
const monthlySales = [12000, 15000, 18000, 14000, 16000];
const totalSales = sum(monthlySales);
console.log(totalSales); // 75000

// ショッピングカートの合計金額
const cartItems = [29.99, 15.5, 8.75, 42.0];
const cartTotal = sum(cartItems);
console.log(cartTotal); // 96.24
```

計算結果を他の関数と一緒に使用できます。

```typescript
import { sum } from 'es-toolkit/math';
import { round } from 'es-toolkit/math';

// 合計後に四捨五入
const measurements = [1.234, 2.567, 3.891];
const total = sum(measurements);
const rounded = round(total, 2);
console.log(rounded); // 7.69

// パーセント計算
const votes = [45, 32, 23];
const totalVotes = sum(votes);
const percentages = votes.map(vote => round((vote / totalVotes) * 100, 1));
console.log(percentages); // [45.0, 32.0, 23.0]
```

#### パラメータ

- `nums` (`readonly number[]`): 合計を計算する数値配列です。

#### 戻り値

(`number`): 配列内のすべての数値の合計を返します。空配列の場合は `0` を返します。
