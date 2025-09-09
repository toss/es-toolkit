# sortedIndex

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

查找应将给定值插入排序数组以保持其排序顺序的最低索引。

- 如果数组已经排序，则 sortedIndex 将确保新值插入正确的位置，而不会打乱顺序。
- 搜索采用二进制搜索算法，因此对大型数组而言效率很高。
- 对于更复杂或自定义的排序逻辑，它将委托给 [sortedIndexBy](./sortedIndexBy.md)，后者允许指定一个 iteratee 函数来自定义元素的比较方式。

该函数返回应插入值的索引。如果数组中已经存在该值，返回的索引将位于该值第一次出现之前。

## 签名

```typescript
function sortedIndex<T>(array: ArrayLike<T> | null | undefined, value: T): number；
```

### 参数

- `array` (`ArrayLike<T> | null | undefined`)： 要检查的排序数组。可以是 null 或 undefined，在这种情况下，它将被视为空数组。
- `value` (`T`)： 要评估的值，并为插入找到合适的索引

### 返回值

(`number`)： 应插入值的索引

## 示例

```typescript

import { sortedIndex } from 'es-toolkit/compat'；

// 数字数组的基本用法
sortedIndex([10, 20, 30, 50], 40)；
// 返回值： 3
// 解释： 40 返回索引 3 以保持排序顺序。

// 处理空数组或 null 数组
sortedIndex(null, 25)；
// 返回值：0
// 说明 空数组或未定义数组被视为空数组，因此返回 0。

// 使用默认比较逻辑（使用 sortedIndexBy 的委托行为）
sortedIndex([10, '20', 30], 25)；
// 返回值：2
// 解释： 使用默认比较逻辑，返回索引 2。
```
