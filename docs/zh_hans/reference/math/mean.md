# mean

计算数字数组的平均值。

如果数组为空，则此函数返回 `NaN`。

## 签名

```typescript
function mean(nums: number[]): number;
```

### 参数

- `nums` (`number[]`): 要计算平均值的数字数组。

### 返回值

(`number`): 数组中所有数字的平均值。

## 示例

```typescript
const numbers = [1, 2, 3, 4, 5];
const result = mean(numbers);
// result 将会是 3
```
