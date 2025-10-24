# dropRight

从数组末尾移除指定数量的元素,返回一个新数组。

```typescript
const dropped = dropRight(arr, itemsCount);
```

## 参考

### `dropRight(arr, itemsCount)`

当您想从数组后面移除一部分元素时,请使用 `dropRight`。移除指定数量的末尾元素,返回一个包含剩余元素的新数组。

```typescript
import { dropRight } from 'es-toolkit/array';

// 移除数组的最后 2 个元素
dropRight([1, 2, 3, 4, 5], 2);
// Returns: [1, 2, 3]

// 如果要移除的数量大于数组长度,则返回空数组
dropRight([1, 2, 3], 5);
// Returns: []
```

传入负数或 0 时,返回一个包含与原数组相同元素的新数组。

```typescript
import { dropRight } from 'es-toolkit/array';

dropRight([1, 2, 3], 0); // [1, 2, 3]
dropRight([1, 2, 3], -2); // [1, 2, 3]
```

#### 参数

- `arr` (`T[]`): 要移除元素的数组。
- `itemsCount` (`number`): 从数组末尾要移除的元素数量。

#### 返回值

(`T[]`): 从末尾移除指定数量元素后的新数组。
