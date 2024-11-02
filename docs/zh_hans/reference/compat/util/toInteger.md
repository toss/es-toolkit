# toInteger

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

将 `value` 转换为整数。

此函数首先将 `value` 转换为有限数。如果结果有任何小数位，
它们会被向下舍入到最接近的整数。

## 签名

```typescript
function toInteger(value?: unknown): number;
```

### 参数

- `value` (`unknown`): 要转换的值。

### 返回值

(`number`): 返回数字。

## 示例

```typescript
toInteger(3.2); // => 3
toInteger(Number.MIN_VALUE); // => 0
toInteger(Infinity); // => 1.7976931348623157e+308
toInteger('3.2'); // => 3
toInteger(Symbol.iterator); // => 0
toInteger(NaN); // => 0
```
