# sortedLastIndexOf

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

在已排序的数组中找到值最后一次出现的索引。它的工作方式类似于 `Array#lastIndexOf` ，但专门用于已排序的数组。

::: warn
请提供已排序的数组作为参数

此函数使用二分查找（Binary search）快速找到索引，因此如果不提供已排序的数组，它将无法正常工作。
:::

## 签名

```typescript
function sortedLastIndexOf(array: ArrayLike | null | undefined, value: T): number;
```

### 参数

- `array` (`ArrayLike | null | undefined`): 已排序的数组。如果数组为 `null` 或 `undefined`，则返回 `-1`。
- `value` (`T`): 要在已排序数组中通过比较查找的值。

### 返回值

( `number` ): 返回最后一个匹配值的索引，如果没有找到则返回 -1。

## 示例

```typescript
import { sortedLastIndexOf } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];
sortedLastIndexOf(numbers, 3);
// 返回值: 2
// 解释: 数组numbers中值3的位置是2。

sortedLastIndexOf(numbers, 6);
// 返回值: -1
// 解释: 6在数组中不存在，所以返回-1。

// 当值重复出现时，返回最后一个匹配值的索引
const duplicateNumbers = [1, 2, 2, 3, 3, 3, 4];
sortedLastIndexOf(duplicateNumbers, 3);
// 返回值: 5
// 解释: 值3的最后一次出现索引是5。

// 如果数组未排序，可能会返回错误的索引
const unSortedArray = [55, 33, 22, 11, 44];
sortedLastIndexOf(unSortedArray, 11);
// 返回值: -1
// 解释: 使用未排序的数组时，可能返回错误结果。

// -0和0被视为相同
const mixedZeroArray = [-0, 0];
sortedLastIndexOf(mixedZeroArray, 0);
// 返回值: 1
// 解释: 在JavaScript中，-0和0被视为相等。

sortedLastIndexOf(mixedZeroArray, -0);
// 返回值: 1
// 解释: 在JavaScript中，-0和0被视为相等。

// 类数组对象
const arrayLike = { length: 3, 0: 10, 1: 20, 2: 20 };
sortedLastIndexOf(arrayLike, 20);
// 返回值: 2
// 解释: 也适用于类数组对象，返回最后一个20的索引。
```
