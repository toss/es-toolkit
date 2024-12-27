# subtract

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

返回两个数字的差值的函数。

如果其中一个数字是 `NaN`，则返回 `NaN`。

## 签名

```typescript
function subtract(value: number, other: number): number;
```

### 参数

- `value` (`number`): 基准数字。
- `other` (`number`): 从 `value` 中减去的数字。

### 返回值

(`number`): 返回 `value` 减去 `other` 的结果。如果其中一个数字是 `NaN`，则返回 `NaN`。

## 示例

```typescript
subtract(6, 4); // 返回 2。
subtract(-6, 4); // 返回 -10。
subtract(NaN, 4); // 因为 value 是 NaN，所以返回 NaN。
subtract(6, NaN); // 因为 other 是 NaN，所以返回 NaN。
subtract(NaN, NaN); // 因为两个参数都是 NaN，所以返回 NaN。
```
