# add

这是一个处理两个数字相加并处理 `NaN` 值的函数。

该函数接受两个数字并返回它们的和。

如果两个值中有一个是 `NaN`，则返回 `NaN`。

## 签名

```typescript
function add(value: number, other: number): number;
```

### 参数

- value (number): 第一个要相加的数值。
- other (number): 第二个要相加的数值。

### 返回值

(number): 返回两个数字的和。如果任一值为 `NaN`，则返回 `NaN`.

## 示例

```typescript
const result1 = add(2, 3); // 两个值都是 number 类型，因此 result1 是 5。
const result2 = add(NaN, 5); // 由于 value 是 NaN，因此 result2 是 NaN。
const result3 = add(10, NaN); // 由于 other 是 NaN，因此 result3 是 NaN。
```
