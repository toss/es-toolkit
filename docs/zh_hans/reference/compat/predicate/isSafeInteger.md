# isSafeInteger

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

检查`value`是否是一个安全整数（在`-(2^53 – 1)`和`(2^53 – 1)`之间，包括边界值）。

安全整数是可以在 JavaScript 中精确表示为 `number` 的整数，并且没有其他整数被舍入到它。

此函数还可以作为TypeScript中的类型谓词，将参数的类型缩小为`number`。

## 签名

```typescript
function isSafeInteger(value?: unknown): boolean;
```

### 参数

- `value` (`unknown`): 要检查的值

### 返回值

(`boolean`): 如果`value`是一个整数并且在安全值范围内，则返回`true`，否则返回`false`

## 示例

```typescript
isSafeInteger(3); // Returns: true
isSafeInteger(Number.MIN_SAFE_INTEGER - 1); // Returns: false
isSafeInteger(1n); // Returns: false
isSafeInteger('1'); // Returns: false
```
