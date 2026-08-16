# sortedIndex (Lodash 兼容性)

::: warning 请直接实现二分查找

这个 `sortedIndex` 函数由于处理 `null`、`undefined` 和各种类型支持而具有复杂性。

相反，请直接实现更快、更现代的二分查找或使用专用库。

:::

查找应将值插入已排序数组的最低索引。

```typescript
const index = sortedIndex(array, value);
```

## 用法

### `sortedIndex(array, value)`

在已排序数组中查找插入值的位置时，请使用 `sortedIndex`。它使用二分查找快速找到位置。

```typescript
import { sortedIndex } from 'es-toolkit/compat';

// 在数字数组中查找插入位置
sortedIndex([30, 50], 40);
// 返回 1（40位于30和50之间）

// 在字符串数组中查找插入位置
sortedIndex(['a', 'c'], 'b');
// 返回 1（'b'位于'a'和'c'之间）

// 当存在相同值时，返回第一个位置
sortedIndex([1, 2, 2, 3], 2);
// 返回 1（第一个2的位置）
```

对于 `null` 或 `undefined` 数组，返回 0。

```typescript
import { sortedIndex } from 'es-toolkit/compat';

sortedIndex(null, 1); // 0
sortedIndex(undefined, 1); // 0
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 已排序的数组。使用未排序的数组可能会产生错误的结果。
- `value` (`T`): 要插入的值。

#### 返回值

(`number`): 返回应插入值的最低索引。如果数组为 `null` 或 `undefined`，则返回 0。
