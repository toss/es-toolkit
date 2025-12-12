# sortedIndexOf (Lodash 兼容性)

::: warning 请直接实现二分查找

这个 `sortedIndexOf` 函数由于复杂的二分查找处理和类型验证而运行缓慢。

相反，请直接实现更快、更现代的二分查找或使用 `Array.prototype.indexOf()`。

:::

查找值在已排序数组中首次出现的索引。

```typescript
const index = sortedIndexOf(array, value);
```

## 用法

### `sortedIndexOf(array, value)`

在已排序数组中查找特定值首次出现的索引时，请使用 `sortedIndexOf`。它使用二分查找快速找到值。

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

// 在数字数组中查找值
sortedIndexOf([11, 22, 33, 44, 55], 33);
// 返回 2

// 当值不存在时
sortedIndexOf([11, 22, 33, 44, 55], 30);
// 返回 -1

// 当存在重复值时，返回第一个索引
sortedIndexOf([1, 2, 2, 3, 3, 3, 4], 3);
// 返回 3（第一个3的位置）

// 0和-0被视为相等
sortedIndexOf([-0, 0], 0);
// 返回 0
```

空数组、`null` 或 `undefined` 返回 -1。

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

sortedIndexOf([], 1); // -1
sortedIndexOf(null, 1); // -1
sortedIndexOf(undefined, 1); // -1
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 已排序的数组。使用未排序的数组可能会产生错误的结果。
- `value` (`T`): 要查找的值。

#### 返回值

(`number`): 返回值首次出现的索引。如果值不存在，则返回 -1。
