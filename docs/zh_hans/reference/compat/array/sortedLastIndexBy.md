# sortedLastIndexBy (Lodash 兼容性)

::: warning 请直接实现二分查找和转换函数

这个 `sortedLastIndexBy` 函数由于复杂的迭代处理和类型转换而运行缓慢。

相反，请直接实现更快、更现代的二分查找和转换函数。

:::

在应用转换函数后，查找应将值插入已排序数组的最高索引。

```typescript
const index = sortedLastIndexBy(array, value, iteratee);
```

## 用法

### `sortedLastIndexBy(array, value, iteratee)`

在应用转换函数后查找值在已排序数组中的最高插入位置时，请使用 `sortedLastIndexBy`。当存在重复值时，它返回最后值之后的索引。

```typescript
import { sortedLastIndexBy } from 'es-toolkit/compat';

// 在按属性排序的对象数组中查找最后插入位置
const objects = [{ x: 4 }, { x: 5 }, { x: 5 }];
sortedLastIndexBy(objects, { x: 5 }, 'x');
// 返回 3（最后一个 x: 5 之后的位置）

// 使用函数进行转换
const numbers = [10, 20, 20, 30];
sortedLastIndexBy(numbers, 20, n => n);
// 返回 3
```

对于 `null` 或 `undefined` 数组，返回 0。

```typescript
import { sortedLastIndexBy } from 'es-toolkit/compat';

sortedLastIndexBy(null, { x: 1 }, 'x'); // 0
sortedLastIndexBy(undefined, { x: 1 }, 'x'); // 0
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 已排序的数组。使用未排序的数组可能会产生错误的结果。
- `value` (`T`): 要插入的值。
- `iteratee` (可选): 要应用于每个元素和值的转换函数、属性名称或属性值数组。

#### 返回值

(`number`): 返回应插入值的最高索引。如果数组为 `null` 或 `undefined`，则返回 0。
