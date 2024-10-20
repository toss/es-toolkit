# median

计算一个数字数组的中位数。

中位数是排序数组中的中间值。
如果数组的元素个数为奇数，中位数就是中间的值。
如果数组的元素个数为偶数，则返回两个中间值的平均值。

如果数组为空，此函数返回`NaN`。

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
