# round

将一个数字四舍五入到指定的精度。

该函数接受一个数字和一个可选的精度值，返回将数字四舍五入到指定小数位数的结果。

## 签名

```typescript
function round(value: number, precision?: number): number;
```

### 参数

- value (`number`): 要四舍五入的数字。
- precision (`number`, 可选): 要四舍五入到的小数位数。默认为 `0`。

### 返回值

(`number`): 四舍五入后的数字。

## 示例

```typescript
const result1 = round(1.2345); // result1 将会是 1
const result2 = round(1.2345, 2); // result2 将会是 1.23
const result3 = round(1.2345, 3); // result3 将会是 1.235
const result4 = round(1.2345, 3.1); // 这将会抛出一个错误
```
