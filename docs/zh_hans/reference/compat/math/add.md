# add

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

将两个数字相加。

## 签名

```typescript
function add(value: number, other: number): number;
```

### 参数

- `value` (`number`): 第一个要相加的数值。
- `other` (`number`): 第二个要相加的数值。

### 返回值

(`number`): 返回两个数字的和。

## 示例

```typescript
const result1 = add(2, 3); // 两个值都是 number 类型，因此 result1 是 5。
const result2 = add(NaN, 5); // 由于 value 是 NaN，因此 result2 是 NaN。
const result3 = add(10, NaN); // 由于 other 是 NaN，因此 result3 是 NaN。
```
