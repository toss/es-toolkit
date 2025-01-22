# multiply

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

将两个数字相乘。

如果任意一个值是 `NaN`，则返回 `NaN`。

## 签名

```typescript
function multiply(value: number, other: number): number;
```

### 参数

- `value` (`number`): 乘法中的第一个数字。
- `other` (`number`): 乘法中的第二个数字。

### 返回值

(`number`): 返回 `value` 和 `other` 的乘积。如果任意一个参数为 `NaN`，则返回 `NaN`。

## 示例

```typescript
multiply(2, 3); // 返回 6。
multiply(2, -3); // 返回 -6。
multiply(NaN, 3); // 返回 NaN，因为 value 是 NaN。
multiply(2, NaN); // 返回 NaN，因为 other 是 NaN。
multiply(NaN, NaN); // 返回 NaN，因为两个参数都是 NaN。
```
