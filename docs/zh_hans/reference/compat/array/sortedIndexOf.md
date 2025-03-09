# sortedIndexOf

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

这个函数用于在已排序的数组中查找第二个参数值首次出现的索引。换句话说，它告诉你要查找的值在已排序数组中的位置。它使用 [sortedIndex](./sortedIndex.md) 函数，通过重复比较后返回索引。

## 签名

```typescript
export function sortedIndexOf(array: ArrayLike | null | undefined, value: T): number;
```

### 参数

- `array` (`ArrayLike | null | undefined`): 已排序的数组。如果数组为 null 或 undefined，则返回 -1。
- `value` (`T`): 要在已排序数组中通过比较查找的值。

### 返回值

(`number`): 为保持排序顺序应插入值的索引。

## 示例

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

const numbers = [11, 22, 33, 44, 55];
const unSortedNumbers = [55, 33, 22, 11, 44];

// 常规情况
sortedIndexOf(numbers, 11);
// 返回值: 0
// 解释: 在 numbers 数组中，值 11 的位置是 0。

// 不存在的值
sortedIndexOf(numbers, 30);
// 返回值: -1
// 解释: 30 不存在于数组中，因此返回 -1。

// 空数组
sortedIndexOf([], 30);
// 返回值: -1
// 解释: 在空数组中查找值时返回 -1。

// 未排序的数组
sortedIndexOf(unSortedNumbers, 11);
// 返回值: -1
// 解释: 使用未排序的数组时返回 -1。
```
