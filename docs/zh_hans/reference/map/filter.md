# filter (`Map`)

根据谓词函数过滤Map。

```typescript
const filtered = filter(map, callback);
```

::: info

此函数仅可从 `es-toolkit/map` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `filter(map, callback)`

当您想创建一个仅包含满足特定条件的条目的新Map时,请使用 `filter`。提供一个测试每个条目的谓词函数,它返回一个仅包含谓词返回true的条目的新Map。

```typescript
import { filter } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
  ['d', 4],
]);

const result = filter(map, value => value > 2);
// 结果:
// Map(2) {
//   'c' => 3,
//   'd' => 4
// }
```

可以根据各种标准进行过滤。

```typescript
import { filter } from 'es-toolkit/map';

// 按值类型过滤
const inventory = new Map([
  ['apple', { quantity: 10, inStock: true }],
  ['banana', { quantity: 0, inStock: false }],
  ['orange', { quantity: 5, inStock: true }],
]);

const inStockItems = filter(inventory, item => item.inStock);
// 结果: 包含'apple'和'orange'条目的Map

// 按键模式过滤
const data = new Map([
  ['user_1', 'Alice'],
  ['admin_1', 'Bob'],
  ['user_2', 'Charlie'],
]);

const users = filter(data, (value, key) => key.startsWith('user_'));
// 结果: 包含'user_1'和'user_2'条目的Map
```

#### 参数

- `map` (`Map<K, V>`): 要过滤的Map。
- `callback` (`(value: V, key: K, map: Map<K, V>) => boolean`): 测试每个条目的谓词函数。

#### 返回值

(`Map<K, V>`): 返回仅包含满足谓词的条目的新Map。
