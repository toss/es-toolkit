# percentile

计算数字数组中给定百分位数对应的值。

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

## 工作原理

将数组按升序排序后,返回以下位置的元素:

```typescript
const index = Math.ceil(sorted.length * (percentile / 100)) - 1;
return sorted[index];
```

这是 **最近排名**(nearest-rank)方法。将数组长度乘以 `percentile / 100` 可以得到从 1 开始的排名(rank);使用 `Math.ceil` 向上取整,选出能覆盖所请求比例及以上数据的最小排名;再减去 `1`,将其转换为从 0 开始的数组索引。

例如,对于长度为 100 的已排序数组,当 `percentile = 75` 时:

- `Math.ceil(100 * 0.75) - 1` → `74`
- 返回第 75 小的值(`sorted[74]`)。

当 `percentile = 0` 时,按上述公式会得到 `-1`,因此作为特殊情况处理,直接返回最小值。

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
