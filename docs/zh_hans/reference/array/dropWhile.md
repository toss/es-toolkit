# dropWhile

从数组开头开始,在满足条件期间移除元素,返回一个新数组。

```typescript
const result = dropWhile(arr, canContinueDropping);
```

## 用法

### `dropWhile(arr, canContinueDropping)`

当您想从数组前面移除满足特定条件的元素时,请使用 `dropWhile`。从数组开头开始,在条件函数返回 `true` 期间移除元素,当条件函数返回 `false` 时停止。

```typescript
import { dropWhile } from 'es-toolkit/array';

// 从开头开始移除小于 3 的元素
const numbers = [1, 2, 3, 4, 2, 5];
dropWhile(numbers, x => x < 3);
// Returns: [3, 4, 2, 5]
// 1 和 2 满足条件被移除,在 3 处条件变为 false 而停止

// 从对象数组中移除满足特定条件的元素
const users = [
  { name: 'Alice', active: false },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true },
  { name: 'David', active: true },
];
dropWhile(users, user => !user.active);
// Returns: [{ name: 'Charlie', active: true }, { name: 'David', active: true }]
```

如果是空数组或没有满足条件的元素,则返回与原数组相同的新数组。

```typescript
import { dropWhile } from 'es-toolkit/array';

dropWhile([1, 2, 3], x => x > 5); // [1, 2, 3]
dropWhile([], x => true); // []
```

#### 参数

- `arr` (`T[]`): 要移除元素的数组。
- `canContinueDropping` (`(item: T, index: number, arr: T[]) => boolean`): 决定是否继续移除元素的条件函数。接收数组的每个元素、索引和整个数组,返回真或假。

#### 返回值

(`T[]`): 从不满足条件的元素到数组末尾的新数组。
