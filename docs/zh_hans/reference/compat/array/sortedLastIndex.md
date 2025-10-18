# sortedLastIndex (Lodash 兼容性)

::: warning 请直接实现二分查找

这个 `sortedLastIndex` 函数由于复杂的二分查找处理和类型验证而运行缓慢。

相反，请直接实现更快、更现代的二分查找。

:::

查找应将值插入已排序数组的最高索引。

```typescript
const index = sortedLastIndex(array, value);
```

## 参考

### `sortedLastIndex(array, value)`

在已排序数组中查找插入值的最高位置时，请使用 `sortedLastIndex`。当存在重复值时，它返回最后位置之后的索引。

```typescript
import { sortedLastIndex } from 'es-toolkit/compat';

// 在具有重复值的数组中查找最后插入位置
sortedLastIndex([4, 5, 5, 5, 6], 5);
// 返回 4（最后一个5之后的位置）

// 查找新值的插入位置
sortedLastIndex([10, 20, 30], 25);
// 返回 3（25位于30之前）

// 当值不存在时
sortedLastIndex([1, 2, 3], 0);
// 返回 0（位于最前面）
```

对于 `null` 或 `undefined` 数组，返回 0。

```typescript
import { sortedLastIndex } from 'es-toolkit/compat';

sortedLastIndex(null, 1); // 0
sortedLastIndex(undefined, 1); // 0
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 已排序的数组。使用未排序的数组可能会产生错误的结果。
- `value` (`T`): 要插入的值。

#### 返回值

(`number`): 返回应插入值的最高索引。如果数组为 `null` 或 `undefined`，则返回 0。
