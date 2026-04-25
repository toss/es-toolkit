# sortedIndexBy (Lodash 兼容性)

::: warning 请直接实现二分查找和转换函数

这个 `sortedIndexBy` 函数由于复杂的迭代处理和类型转换而运行缓慢。

相反，请直接实现更快、更现代的二分查找和转换函数。

:::

在应用转换函数后，查找应将值插入已排序数组的最低索引。

```typescript
const index = sortedIndexBy(array, value, iteratee);
```

## 用法

### `sortedIndexBy(array, value, iteratee)`

在应用转换函数后查找值在已排序数组中的插入位置时，请使用 `sortedIndexBy`。它对每个元素和值应用转换函数进行比较。

```typescript
import { sortedIndexBy } from 'es-toolkit/compat';

// 在按属性排序的对象数组中查找插入位置
const objects = [{ x: 4 }, { x: 5 }];
sortedIndexBy(objects, { x: 4 }, 'x');
// 返回 0

// 使用函数进行转换
const numbers = [10, 20, 30];
sortedIndexBy(numbers, 25, n => n);
// 返回 2

// 使用属性值数组进行转换
const users = [{ name: 'alice' }, { name: 'bob' }];
sortedIndexBy(users, { name: 'bob' }, ['name', 'bob']);
// 返回 1 (等价于向 [false, true] 中插入 true)
```

对于 `null` 或 `undefined` 数组，返回 0。

```typescript
import { sortedIndexBy } from 'es-toolkit/compat';

sortedIndexBy(null, { x: 1 }, 'x'); // 0
sortedIndexBy(undefined, { x: 1 }, 'x'); // 0
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 已排序的数组。使用未排序的数组可能会产生错误的结果。
- `value` (`T`): 要插入的值。
- `iteratee` (可选): 要应用于每个元素和值的转换函数、属性名称或属性值数组。

#### 返回值

(`number`): 返回应插入值的最低索引。如果数组为 `null` 或 `undefined`，则返回 0。
