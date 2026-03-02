# forEach (`Map`)

对Map中的每个条目执行一次提供的函数。

```typescript
forEach(map, callback);
```

::: info

此函数仅可从 `es-toolkit/map` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `forEach(map, callback)`

当您想对Map中的每个条目执行函数时,请使用 `forEach`。回调函数接收值、键和Map本身作为参数。这对于日志记录、更新外部状态或对每个条目执行操作等副作用很有用。

```typescript
import { forEach } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

forEach(map, (value, key) => {
  console.log(`${key}: ${value}`);
});
// 输出:
// a: 1
// b: 2
// c: 3
```

可以对每个条目执行各种操作。

```typescript
import { forEach } from 'es-toolkit/map';

// 累积值
const prices = new Map([
  ['apple', 1.5],
  ['banana', 0.75],
  ['orange', 2.0],
]);

let total = 0;
forEach(prices, value => {
  total += value;
});
// total现在是4.25

// 将条目收集到数组中
const users = new Map([
  ['user1', { name: 'Alice', age: 25 }],
  ['user2', { name: 'Bob', age: 30 }],
]);

const userList: string[] = [];
forEach(users, (value, key) => {
  userList.push(`${key}: ${value.name} (${value.age})`);
});
// userList: ['user1: Alice (25)', 'user2: Bob (30)']

// 根据条件更新外部Map
const inventory = new Map([
  ['item1', { stock: 10, price: 5 }],
  ['item2', { stock: 0, price: 10 }],
  ['item3', { stock: 5, price: 15 }],
]);

const outOfStock = new Map<string, any>();
forEach(inventory, (value, key) => {
  if (value.stock === 0) {
    outOfStock.set(key, value);
  }
});
// outOfStock包含item2
```

#### 参数

- `map` (`Map<K, V>`): 要迭代的Map。
- `callback` (`(value: V, key: K, map: Map<K, V>) => void`): 对每个条目执行的函数。

#### 返回值

(`void`): 此函数不返回值。
