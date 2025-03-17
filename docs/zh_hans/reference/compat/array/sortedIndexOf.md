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
const unSortedArray = [55, 33, 22, 11, 44];
const duplicateArray = [1, 2, 2, 3, 3, 3, 4];
const emptyArray = [];
const zeroMinusArray = [-0];
const zeroPlusArray = [0];
const floatingArray = [1.1, 2.2, 3.3];
const arrayLike = { length: 3, 0: 10, 1: 20, 2: 30 };

// 常规情况
sortedIndexOf(numbers, 11);
// 返回值: 0
// 解释: 数组numbers中值11的位置是0。

// 重复值
sortedIndexOf(duplicateArray, 3);
// 返回值: 3
// 解释: 值3的第一次出现索引是3。

// 不存在的值
sortedIndexOf(numbers, 30);
// 返回值: -1
// 解释: 30在数组中不存在，所以返回-1。

// 额外参数
sortedIndexOf(numbers, 22, true);
// 返回值: 1
// 解释: 如果添加更多参数，它们将被忽略。

// 浮点值
sortedIndexOf(floatingArray, 2.2);
// 返回值: 1
// 解释: 数组中值2.2的位置是1。

// 空数组
sortedIndexOf(emptyArray, 30);
// 返回值: -1
// 解释: 在空数组中搜索值时，返回-1。

// 空数组与undefined
sortedIndexOf(emptyArray, undefined);
// 返回值: -1
// 解释: 在空数组中搜索值时，即使是undefined也总是返回-1。

// 未排序数组
sortedIndexOf(unSortedArray, 11);
// 返回值: -1
// 解释: 使用未排序的数组时，返回-1。

// -0和0被视为相同
sortedIndexOf(zeroMinusArray, 0);
// 返回值: 0
// 解释: 在JavaScript中，-0和0被视为相等。

// -0和0被视为相同
sortedIndexOf(zeroPlusArray, -0);
// 返回值: 0
// 解释: 在JavaScript中，-0和0被视为相等。

// 类数组对象
sortedIndexOf(arrayLike, 20);
// 返回值: 1
// 解释: 也适用于类数组对象。
```
