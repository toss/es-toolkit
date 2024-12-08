# isElement

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

检查 `value` 是否是 DOM 元素。由于是结构性检查，结果可能不准确。

## 签名

```typescript
function isElement(value?: any): boolean;
```

### 参数

- `value` (`any`): 要检查的值。

### 返回值

(`boolean`): 如果 `value` 是 DOM 元素，则返回 `true`，否则返回 `false`。

## 示例

```typescript
console.log(isElement(document.body)); // true
console.log(isElement('<body>')); // false
```
