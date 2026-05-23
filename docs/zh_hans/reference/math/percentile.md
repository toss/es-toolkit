# percentile

计算数字数组中给定百分位数对应的值。

`percentile` 函数将数组按升序排序,并返回最接近排名位置的元素 ([Nearest rank method](https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method))。

```typescript
const value = percentile(arr, p);
```

## 用法

### `percentile(arr, percentile)`

当您想从数字数组中找到特定百分位数对应的值时,请使用 `percentile`。例如,第 50 百分位是中位数,第 75 百分位是 75% 的数据小于或等于该值的位置。

```typescript
import { percentile } from 'es-toolkit/math';

// 求数组的中位数(第 50 百分位)
const median = percentile([1, 2, 3, 4, 5], 50); // median 为 3

// 求第 75 百分位
const p75 = percentile([1, 2, 3, 4, 5], 75); // p75 为 4

// 未排序的数组会自动排序
const result = percentile([50, 10, 30, 20, 40], 50); // result 为 30

// 第 0 百分位返回最小值
const min = percentile([5, 1, 4, 2, 3], 0); // min 为 1

// 空数组返回 NaN
const empty = percentile([], 50); // empty 为 NaN
```

#### 参数

- `arr` (`readonly number[]`): 要计算百分位数的数字数组。
- `percentile` (`number`): 要计算的百分位数,取值范围为 `[0, 100]`。

#### 返回值

(`number`): 返回给定百分位数对应的值。如果数组为空,则返回 `NaN`。

#### 错误

如果 `percentile` 为 `NaN`、小于 `0` 或大于 `100`,则抛出错误。
