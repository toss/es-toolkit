# mean

数値配列の平均を計算します。

```typescript
const average = mean(nums);
```

## 参照

### `mean(nums)`

数値配列の平均値を求めたい場合は `mean` を使用してください。すべての数値を足し合わせて配列の長さで割ることで平均を計算します。空の配列が与えられた場合は `NaN` を返します。

```typescript
import { mean } from 'es-toolkit/math';

// 数値配列の平均を計算します
const numbers = [1, 2, 3, 4, 5];
const result = mean(numbers);
// resultは3になります ((1 + 2 + 3 + 4 + 5) / 5 = 15 / 5 = 3)

// 小数点がある数値の平均を計算します
const decimals = [1.5, 2.5, 3.5];
const decimalResult = mean(decimals);
// decimalResultは2.5になります

// 空の配列の場合はNaNを返します
const emptyResult = mean([]);
// emptyResultはNaNになります
```

#### パラメータ

- `nums` (`readonly number[]`): 平均を計算する数値配列です。

#### 戻り値

(`number`): 配列内のすべての数値の平均を返します。空の配列の場合は `NaN` を返します。
