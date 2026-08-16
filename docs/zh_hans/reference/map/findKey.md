# findKey (`Map`)

查找Map中谓词函数返回true的第一个键。

```typescript
const key = findKey(map, doesMatch);
```

::: info

此函数仅可从 `es-toolkit/map` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `findKey(map, doesMatch)`

当您想查找符合特定条件的第一个条目的键时,请使用 `findKey`。提供一个测试每个条目的谓词函数,它返回第一个匹配条目的键,如果未找到则返回undefined。

```typescript
import { findKey } from 'es-toolkit/map';

const map = new Map([
  ['apple', { color: 'red', quantity: 10 }],
  ['banana', { color: 'yellow', quantity: 5 }],
  ['grape', { color: 'purple', quantity: 15 }],
]);

const result = findKey(map, value => value.quantity > 10);
// 结果: 'grape'
```

您可以根据各种标准进行搜索。

```typescript
import { findKey } from 'es-toolkit/map';

// 按值属性查找
const users = new Map([
  ['user1', { name: 'Alice', age: 25 }],
  ['user2', { name: 'Bob', age: 30 }],
  ['user3', { name: 'Charlie', age: 35 }],
]);

const seniorUser = findKey(users, user => user.age >= 35);
// 结果: 'user3'

// 按键模式查找
const settings = new Map([
  ['api.timeout', 5000],
  ['api.retries', 3],
  ['db.host', 'localhost'],
]);

const dbSetting = findKey(settings, (value, key) => key.startsWith('db.'));
// 结果: 'db.host'
```

#### 参数

- `map` (`Map<K, V>`): 要搜索的Map。
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): 测试每个条目的谓词函数。

#### 返回值

(`K | undefined`): 满足谓词的第一个条目的键,如果未找到则返回undefined。
