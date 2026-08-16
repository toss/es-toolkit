# keyBy (`Map`)

根据提供的键生成函数映射Map的每个条目。

```typescript
const result = keyBy(map, getKeyFromEntry);
```

::: info

此函数仅可从 `es-toolkit/map` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `keyBy(map, getKeyFromEntry)`

当您想通过从值生成新键来重组Map时,请使用 `keyBy`。提供一个从每个值-键对生成键的函数,它返回一个新Map,其中键由键函数生成,值是原始映射中的相应值。如果多个条目产生相同的键,则使用最后遇到的值。

```typescript
import { keyBy } from 'es-toolkit/map';

const map = new Map([
  ['x', { type: 'fruit', name: 'apple' }],
  ['y', { type: 'fruit', name: 'banana' }],
  ['z', { type: 'vegetable', name: 'carrot' }],
]);

const result = keyBy(map, item => item.type);
// 结果:
// Map(2) {
//   'fruit' => { type: 'fruit', name: 'banana' },
//   'vegetable' => { type: 'vegetable', name: 'carrot' }
// }
// 注意: 'banana'被保留是因为它是最后一个'fruit'
```

可以根据各种标准重组数据。

```typescript
import { keyBy } from 'es-toolkit/map';

// 按ID属性索引
const users = new Map([
  ['user1', { id: 101, name: 'Alice', role: 'admin' }],
  ['user2', { id: 102, name: 'Bob', role: 'user' }],
  ['user3', { id: 103, name: 'Charlie', role: 'user' }],
]);

const byId = keyBy(users, user => user.id);
// 结果: 键为101, 102, 103的Map

// 按角色索引(每个角色的最后一个用户获胜)
const byRole = keyBy(users, user => user.role);
// 结果: Map(2) {
//   'admin' => { id: 101, name: 'Alice', role: 'admin' },
//   'user' => { id: 103, name: 'Charlie', role: 'user' }
// }

// 使用值和原始键转换键
const inventory = new Map([
  ['item_1', { category: 'electronics', price: 100 }],
  ['item_2', { category: 'electronics', price: 200 }],
]);

const categorized = keyBy(inventory, (value, key) => `${value.category}_${key}`);
// 结果: 键为'electronics_item_1', 'electronics_item_2'的Map
```

#### 参数

- `map` (`Map<K, V>`): 要映射的条目的Map。
- `getKeyFromEntry` (`(value: V, key: K, object: Map<K, V>) => K2`): 从值-键对生成键的函数。

#### 返回值

(`Map<K2, V>`): 返回一个Map,其中生成的键映射到每个条目的值。
