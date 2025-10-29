# isSubsetWith

根据自定义比较函数检查一个数组是否是另一个数组的子集。

```typescript
const result = isSubsetWith(superset, subset, areItemsEqual);
```

## 参考

### `isSubsetWith(superset, subset, areItemsEqual)`

当您想用自定义的比较函数确认子集关系时,请使用 `isSubsetWith`。在比较对象或需要特殊比较逻辑时很有用。

```typescript
import { isSubsetWith } from 'es-toolkit/array';

// 根据对象的 id 检查子集
const users = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
const targetUsers = [
  { id: 2, name: 'jane' },
  { id: 1, name: 'john' },
];
isSubsetWith(users, targetUsers, (a, b) => a.id === b.id);
// Returns: true

// 不是子集的情况
const allUsers = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const someUsers = [{ id: 3, name: 'bob' }];
isSubsetWith(allUsers, someUsers, (a, b) => a.id === b.id);
// Returns: false
```

也可以使用复杂的比较逻辑。

```typescript
import { isSubsetWith } from 'es-toolkit/array';

// 不区分大小写的字符串比较
const validNames = ['Alice', 'Bob', 'Charlie'];
const userNames = ['alice', 'BOB'];
isSubsetWith(validNames, userNames, (a, b) => a.toLowerCase() === b.toLowerCase());
// Returns: true

// 范围内的数字比较
const validRanges = [1, 2, 3, 4, 5];
const testNumbers = [1.1, 2.8];
isSubsetWith(validRanges, testNumbers, (a, b) => Math.abs(a - b) < 0.5);
// Returns: true (1.1 与 1 足够接近,2.8 与 3 足够接近)
```

#### 参数

- `superset` (`readonly T[]`): 可以包含子集所有元素的超集数组。
- `subset` (`readonly T[]`): 要确认是否包含在超集中的子集数组。
- `areItemsEqual` (`(x: T, y: T) => boolean`): 判断两个元素是否相同的函数。相同时应返回 `true`,不同时返回 `false`。

#### 返回值

(`boolean`): 根据自定义比较函数,如果子集的所有元素都包含在超集中,则返回 `true`,否则返回 `false`。
