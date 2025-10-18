# dropRightWhile

从数组末尾开始,在满足条件期间移除元素,返回一个新数组。

```typescript
const result = dropRightWhile(arr, canContinueDropping);
```

## 参考

### `dropRightWhile(arr, canContinueDropping)`

当您想从数组后面移除满足特定条件的元素时,请使用 `dropRightWhile`。从数组末尾开始,在条件函数返回 `true` 期间移除元素,当条件函数返回 `false` 时停止。

```typescript
import { dropRightWhile } from 'es-toolkit/array';

// 从末尾开始移除大于 3 的元素
const numbers = [1, 2, 3, 4, 5];
dropRightWhile(numbers, x => x > 3);
// Returns: [1, 2, 3]
// 4 和 5 满足条件被移除,在 3 处条件变为 false 而停止

// 从对象数组中移除满足特定条件的元素
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: true },
  { name: 'Charlie', active: false },
  { name: 'David', active: false },
];
dropRightWhile(users, user => !user.active);
// Returns: [{ name: 'Alice', active: true }, { name: 'Bob', active: true }]
```

如果是空数组或没有满足条件的元素,则返回与原数组相同的新数组。

```typescript
import { dropRightWhile } from 'es-toolkit/array';

dropRightWhile([1, 2, 3], x => x > 5); // [1, 2, 3]
dropRightWhile([], x => true); // []
```

#### 参数

- `arr` (`T[]`): 要移除元素的数组。
- `canContinueDropping` (`(item: T, index: number, arr: T[]) => boolean`): 决定是否继续移除元素的条件函数。接收数组的每个元素、索引和整个数组,返回真或假。

#### 返回值

(`T[]`): 从不满足条件的元素到数组开头的新数组。
