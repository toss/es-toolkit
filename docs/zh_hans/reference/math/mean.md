# mean

计算数字数组的平均值。

```typescript
const average = mean(nums);
```

## 用法

### `mean(nums)`

当您想求数字数组的平均值时,请使用 `mean`。它通过将所有数字相加后除以数组的长度来计算平均值。如果给定空数组,则返回 `NaN`。

```typescript
import { mean } from 'es-toolkit/math';

// 计算数字数组的平均值
const numbers = [1, 2, 3, 4, 5];
const result = mean(numbers);
// result 为 3 ((1 + 2 + 3 + 4 + 5) / 5 = 15 / 5 = 3)

// 计算带小数的数字的平均值
const decimals = [1.5, 2.5, 3.5];
const decimalResult = mean(decimals);
// decimalResult 为 2.5

// 空数组返回 NaN
const emptyResult = mean([]);
// emptyResult 为 NaN
```

#### 参数

- `nums` (`readonly number[]`): 要计算平均值的数字数组。

#### 返回值

(`number`): 返回数组中所有数字的平均值。如果数组为空,则返回 `NaN`。
