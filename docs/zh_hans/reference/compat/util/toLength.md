# toLength

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

将值转换为有效的索引。有效的索引是一个大于或等于 `0` 且小于或等于 `2^32 - 1` 的整数。

它将给定的值转换为数字并向下取整为整数。如果值小于 `0`，则返回 `0`。如果值超过 `2^32 - 1`，则返回 `2^32 - 1`。

## 签名

```typescript
function toLength(value?: unknown): number;
```

### 参数

- `value` (`unknown`): 要转换为有效索引的值。

### 返回值

(`number`): 转换为有效索引的值。

## 示例

```typescript
toLength(3.2); // => 3
toLength(-1); // => 0
toLength(1.9); // => 1
toLength('42'); // => 42
toLength(null); // => 0
```
