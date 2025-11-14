# takeWhile

从数组的开头获取元素,直到条件函数返回假为止,创建一个新数组。

```typescript
const taken = takeWhile(arr, predicate);
```

## 用法

### `takeWhile(arr, predicate)`

当您只需要从数组开头开始满足特定条件的元素时,请使用 `takeWhile`。遇到不满足条件的第一个元素时会停止获取。

```typescript
import { takeWhile } from 'es-toolkit/array';

// 只获取小于3的元素。
takeWhile([1, 2, 3, 4], x => x < 3);
// Returns: [1, 2]

// 从开头就没有大于3的元素,因此返回空数组。
takeWhile([1, 2, 3, 4], x => x > 3);
// Returns: []
```

也可以用于对象数组。

```typescript
import { takeWhile } from 'es-toolkit/array';

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
  { name: 'David', age: 40 },
];

// 只获取30岁以下的用户。
takeWhile(users, user => user.age < 30);
// Returns: [{ name: 'Alice', age: 25 }]
```

#### 参数

- `arr` (`T[]`): 要获取元素的数组。
- `predicate` (`(element: T) => boolean`): 对每个元素调用的条件函数。只要此函数返回真,就会获取元素。

#### 返回值

(`T[]`): 返回包含从开头开始获取的、条件函数返回真的元素的新数组。
