# sortedLastIndex

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

使用二分查找确定将 `value` 插入到 `array` 中应保持其排序顺序的最高索引。

## 签名

```typescript
function sortedLastIndex<T>(array: ArrayLike<T> | null | undefined, value: T): number;
```

### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要检查的已排序数组。
- `value` (`T`): 要评估的值。

### 返回值

(`number`): 返回应将值插入到数组中的索引。

## 示例

```typescript
sortedLastIndex([4, 5, 5, 5, 6], 5);
// => 4
```
