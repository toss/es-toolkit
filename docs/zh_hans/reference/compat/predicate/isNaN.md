# isNaN

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

检查值是否为`NaN`。

## 签名

```typescript
function isNaN(value: unknown): value is typeof NaN;
```

### 参数

- `value` (`unknown`): 要检查的值。

### 返回值

(`value is typeof NaN`): 如果值是NaN，则为`true`，否则为`false`。

## 示例

```typescript
isNaN(NaN); // true
isNaN(0); // false
isNaN('NaN'); // false
isNaN(undefined); // false
```
