# forEach (`Set`)

对Set中的每个元素执行一次提供的函数。

```typescript
forEach(set, callback);
```

::: info

此函数仅可从 `es-toolkit/set` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `forEach(set, callback)`

当您想对Set中的每个元素执行函数时,请使用 `forEach`。回调函数接收值两次(为了与Map.forEach保持一致)和Set本身作为参数。这对于日志记录、更新外部状态或对每个元素执行操作等副作用很有用。

```typescript
import { forEach } from 'es-toolkit/set';

const set = new Set([1, 2, 3]);

forEach(set, value => {
  console.log(value * 2);
});
// 输出:
// 2
// 4
// 6
```

可以对每个元素执行各种操作。

```typescript
import { forEach } from 'es-toolkit/set';

// 累积值
const numbers = new Set([1, 2, 3, 4, 5]);

let sum = 0;
forEach(numbers, value => {
  sum += value;
});
// sum现在是15

// 带转换地将元素收集到数组中
const names = new Set(['alice', 'bob', 'charlie']);

const uppercased: string[] = [];
forEach(names, value => {
  uppercased.push(value.toUpperCase());
});
// uppercased: ['ALICE', 'BOB', 'CHARLIE']

// 根据条件更新外部Set
const scores = new Set([85, 92, 78, 95, 88]);

const highScores = new Set<number>();
forEach(scores, value => {
  if (value >= 90) {
    highScores.add(value);
  }
});
// highScores包含92和95

// 处理对象
const users = new Set([
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true },
]);

const activeUserIds: number[] = [];
forEach(users, user => {
  if (user.active) {
    activeUserIds.push(user.id);
  }
});
// activeUserIds: [1, 3]
```

#### 参数

- `set` (`Set<T>`): 要迭代的Set。
- `callback` (`(value: T, value2: T, set: Set<T>) => void`): 对每个元素执行的函数。

#### 返回值

(`void`): 此函数不返回值。
