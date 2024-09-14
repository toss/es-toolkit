# isInteger

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

检查`value`是否为整数。

这个函数还可以作为TypeScript中的类型断言，将参数类型缩小到`number`。

## 签名

```typescript
function isInteger(value?: unknown): value is number;
```

### 参数

- `value` (`unknown`): 要检查的值

### 返回值

(`boolean`): `value`是整数则返回`true`，否则返回`false`。

## 示例

```typescript
isInteger(3); // Returns: true
isInteger(Infinity); // Returns: false
isInteger('3'); // Returns: false
isInteger([]); // Returns: false
```
