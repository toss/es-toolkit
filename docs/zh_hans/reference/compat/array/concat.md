# concat

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

将多个数组和值连接成一个数组。

## 签名

```typescript
function concat<T>(...values: Array<T | T[]>): T[];
```

### 参数

- `values` (`...(T | T[])`): 要连接的值和/或数组。

### 返回

(`T[]`): 一个包含所有输入值的新的扁平化数组。

## 示例

```typescript
// 连接单个值
concat(1, 2, 3);
// 返回 [1, 2, 3]

// 连接值的数组
concat([1, 2], [3, 4]);
// 返回 [1, 2, 3, 4]

// 连接单个值和数组的混合
concat(1, [2, 3], 4);
// 返回 [1, 2, 3, 4]

// 连接嵌套数组
concat([1, [2, 3]], 4);
// 返回 [1, [2, 3], 4]
```
