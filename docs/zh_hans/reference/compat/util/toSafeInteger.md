# toSafeInteger

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

此函数首先将 `value` 转换为安全整数。如果值是无限的，则将其转换为最大或最小安全整数。任何小数点都将通过截断值来移除。

## 签名

```typescript
function toSafeInteger(value?: unknown): number;
```

### 参数

- `value` (`unknown`): 要转换的值。

### 返回值

(`number`): 转换后的安全整数。

## 示例

```typescript
toSafeInteger(3.2); // => 3
toSafeInteger(Number.MAX_VALUE); // => 9007199254740991
toSafeInteger(Infinity); // => 9007199254740991
toSafeInteger('3.2'); // => 3
toSafeInteger(NaN); // => 0
toSafeInteger(null); // => 0
toSafeInteger(-Infinity); // => -9007199254740991
```
