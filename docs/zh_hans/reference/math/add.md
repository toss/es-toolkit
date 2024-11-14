# add

处理两个数值相加时“无效或NaN值”的函数。

该函数接受两个数值，并返回它们的和。

如果两个值中的任意一个是“无效或NaN值”，则返回`NaN`。

## 签名

```typescript
function add(value: number, other: number): number;
```

### 参数

- value (number): 第一个要相加的数值。
- other (number): 第二个要相加的数值。

### 返回值

(number): 返回两个数值的和。如果任一值是`NaN`或者是“无效值”，则返回`NaN`。

## 示例

```typescript
const result1 = add(2, 3); // 两个值都是number类型，所以result1为5。
const result2 = add(5, 'a'); // other的值不是number类型，因此result2为NaN。
const result3 = add(NaN, 10); // value为NaN，因此result3为NaN。
const result4 = add(2, NaN); // other为NaN，因此result4为NaN。
```
