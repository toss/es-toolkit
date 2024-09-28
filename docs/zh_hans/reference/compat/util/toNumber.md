# toNumber

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

将 `value` 转换为数字。

与 `Number()` 不同，此函数对符号返回 `NaN`。

## 签名

```typescript
function toNumber(value?: unknown): number;
```

### 参数

- `value` (`unknown`): 要转换的值。

### 返回值

(`number`): 返回数字。

## 示例

```typescript
toNumber(3.2); // => 3.2
toNumber(Number.MIN_VALUE); // => 5e-324
toNumber(Infinity); // => Infinity
toNumber('3.2'); // => 3.2
toNumber(Symbol.iterator); // => NaN
toNumber(NaN); // => NaN
```
