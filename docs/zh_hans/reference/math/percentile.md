# percentile

计算数字数组中给定百分位数对应的值。

`percentile` 函数将数组按升序排序,并返回最接近排名位置的元素 ([Nearest rank method](https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method))。

```typescript
const value = percentile(arr, p);
```

## 签名

```typescript
function percentile(arr: readonly number[], percentile: number): number;
```

### 参数

- `arr` (`readonly number[]`): 要计算百分位数的数字数组。
- `percentile` (`number`): 要计算的百分位数,取值范围为 `[0, 100]`。

### 返回值

(`number`): 返回给定百分位数对应的值。如果数组为空,则返回 `NaN`。

### 异常

如果 `percentile` 为 `NaN`、小于 `0` 或大于 `100`,则抛出 `Error`。

## 示例

```typescript
import { percentile } from 'es-toolkit/math';

// 返回数组的中位数(第 50 百分位)
percentile([1, 2, 3, 4, 5], 50);
// 返回 3

// 计算第 75 百分位
percentile([1, 2, 3, 4, 5], 75);
// 返回 4

// 未排序的数组会自动排序
percentile([50, 10, 30, 20, 40], 50);
// 返回 30

// 在第 0 百分位返回最小值
percentile([5, 1, 4, 2, 3], 0);
// 返回 1

// 空数组返回 NaN
percentile([], 50);
// 返回 NaN
```
