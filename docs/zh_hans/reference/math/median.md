# median

计算数字数组的中位数。

如果数组为空，则此函数返回 `NaN`。
如果数组有奇数个元素，则返回中间的元素。
如果数组有偶数个元素，则返回中间两个元素的平均值。

## 签名

```typescript
function median(nums: readonly number[]): number;
```

### 参数

- `nums` (`readonly number[]`): 要计算中位数的数字数组。

### 返回值

(`number`): 数组中所有数字的中位数。

## 示例

```typescript
const arrayWithOddNumberOfElements = [1, 2, 3, 4, 5];
const result = median(arrayWithOddNumberOfElements);
// result 将会是 3

const arrayWithEvenNumberOfElements = [1, 2, 3, 4];
const result = median(arrayWithEvenNumberOfElements);
// result 将会是 2.5
```
