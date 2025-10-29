# drop

从数组开头移除指定数量的元素,返回一个新数组。

```typescript
const dropped = drop(arr, itemsCount);
```

## 参考

### `drop(arr, itemsCount)`

当您想从数组前面移除一部分元素时,请使用 `drop`。移除指定数量的开头元素,返回一个包含剩余元素的新数组。

```typescript
import { drop } from 'es-toolkit/array';

// 移除数组的前 2 个元素
drop([1, 2, 3, 4, 5], 2);
// Returns: [3, 4, 5]

// 如果要移除的数量大于数组长度,则返回空数组
drop([1, 2, 3], 5);
// Returns: []
```

传入负数或 0 时,返回一个包含与原数组相同元素的新数组。

```typescript
import { drop } from 'es-toolkit/array';

drop([1, 2, 3], 0); // [1, 2, 3]
drop([1, 2, 3], -2); // [1, 2, 3]
```

#### 参数

- `arr` (`T[]`): 要移除元素的数组。
- `itemsCount` (`number`): 从数组开头要移除的元素数量。

#### 返回值

(`T[]`): 从开头移除指定数量元素后的新数组。
