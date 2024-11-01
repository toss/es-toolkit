# sum

计算一个数字数组的总和。

该函数接受一个数字数组，并返回数组中所有元素的总和。
该函数确保两个数组的和等于它们连接后的数组的和。

## 签名

```typescript
function sum(nums: number[]): number;
```

### 参数

- `nums` (`number[]`): 要求和的数字数组。

### 返回值

(`number`): 数组中所有数字的总和。

## 示例

```typescript
const numbers = [1, 2, 3, 4, 5];
const result = sum(numbers);
// result 将会是 15
```
