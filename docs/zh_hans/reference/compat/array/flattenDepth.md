# flattenDepth

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

将数组展平到指定的深度。

## 签名

```typescript
function flattenDepth<T, D extends number = 1>(value: T[] | object, depth: D): Array<FlatArray<T[], D>> | [];
```

### 参数

- `value` (`T[] | object`): 要展平的值。
- `depth` (`D`): 指定嵌套数组结构展平深度的级别。默认值为1。

### 返回值

(`Array<FlatArray<T[], D>> | []`): 展平后的新数组。

## 示例

```typescript
const arr = flattenDepth([1, [2, 3], [4, [5, 6]]], 1);
// Returns: [1, 2, 3, 4, [5, 6]]

const arr = flattenDepth([1, [2, 3], [4, [5, 6]]], 2);
// Returns: [1, 2, 3, 4, 5, 6]
```
