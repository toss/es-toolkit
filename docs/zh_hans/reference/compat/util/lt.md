# lt

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

检查值是否小于其他值。

## 签名

```typescript
function lt(value: unknown, other: unknown): boolean;
```

### 参数

- `value` (`unknown`): 要比较的值。
- `other` (`unknown`): 要比较的另一个值。

### 返回值

(`boolean`): 如果值小于其他值，则返回`true`，否则返回`false`。

## 示例

```typescript
lt(1, 3); // true
lt(3, 3); // false
lt(3, 1); // false
```
