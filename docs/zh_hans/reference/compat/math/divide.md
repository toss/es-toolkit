# divide

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

除以两个数字。

如果任意一个数字是`NaN`，函数将返回`NaN`。

## 签名

```typescript
function divide(value: number, other: number): number;
```

### 参数

- `value` (`number`): 除法中的第一个数字。
- `other` (`number`): 除法中的第二个数字。

### 返回值

(`number`): 值和其他的商。

## 示例

```typescript
divide(6, 3); // => 2
divide(2, NaN); // => NaN
divide(NaN, 3); // => NaN
divide(NaN, NaN); // => NaN
```