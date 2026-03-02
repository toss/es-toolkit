# median

计算数字数组的中位数。

```typescript
const middle = median(nums);
```

## 用法

### `median(nums)`

当您想求数字数组的中位数时,请使用 `median`。将数组按升序排序后,找到位于中间的值。对于具有奇数个元素的数组,返回正中间的值,对于具有偶数个元素的数组,返回中间两个值的平均值。如果给定空数组,则返回 `NaN`。

```typescript
import { median } from 'es-toolkit/math';

// 计算具有奇数个元素的数组的中位数
const oddNumbers = [1, 2, 3, 4, 5];
const oddResult = median(oddNumbers);
// oddResult 为 3 (排序数组 [1, 2, 3, 4, 5] 中的中间值)

// 计算具有偶数个元素的数组的中位数
const evenNumbers = [1, 2, 3, 4];
const evenResult = median(evenNumbers);
// evenResult 为 2.5 ((2 + 3) / 2 = 2.5)

// 未排序的数组会自动排序
const unordered = [3, 1, 4, 1, 5];
const unorderedResult = median(unordered);
// unorderedResult 为 3 (排序后 [1, 1, 3, 4, 5] 中的中间值)

// 空数组返回 NaN
const emptyResult = median([]);
// emptyResult 为 NaN
```

#### 参数

- `nums` (`readonly number[]`): 要计算中位数的数字数组。

#### 返回值

(`number`): 返回数组中所有数字的中位数。如果数组为空,则返回 `NaN`。
