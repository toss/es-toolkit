# keyBy (`Set`)

根据提供的键生成函数映射Set的每个元素。

```typescript
const result = keyBy(set, getKeyFromValue);
```

::: info

此函数仅可从 `es-toolkit/set` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `keyBy(set, getKeyFromValue)`

当您想通过从值生成键将Set转换为Map时,请使用 `keyBy`。提供一个从每个值生成键的函数,它返回一个新Map,其中键由键函数生成,值是原始集合中的相应值。如果多个元素产生相同的键,则使用最后遇到的值。

```typescript
import { keyBy } from 'es-toolkit/set';

const set = new Set([
  { type: 'fruit', name: 'apple' },
  { type: 'fruit', name: 'banana' },
  { type: 'vegetable', name: 'carrot' },
]);

const result = keyBy(set, item => item.type);
// 结果:
// Map(2) {
//   'fruit' => { type: 'fruit', name: 'banana' },
//   'vegetable' => { type: 'vegetable', name: 'carrot' }
// }
// 注意: 'banana'被保留是因为它是最后一个'fruit'
```

可以根据各种标准创建索引。

```typescript
import { keyBy } from 'es-toolkit/set';

// 按ID索引
const users = new Set([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
]);

const byId = keyBy(users, user => user.id);
// 结果: Map(3) { 1 => {...}, 2 => {...}, 3 => {...} }

// 按名称索引
const byName = keyBy(users, user => user.name);
// 结果: 键为'Alice', 'Bob', 'Charlie'的Map

// 按派生值索引
const numbers = new Set([1, 2, 3, 4, 5]);

const byParity = keyBy(numbers, num => (num % 2 === 0 ? 'even' : 'odd'));
// 结果: Map(2) {
//   'odd' => 5,
//   'even' => 4
// }
// 注意: 保留最后的偶数(4)和最后的奇数(5)
```

#### 参数

- `set` (`Set<T>`): 要映射的元素的Set。
- `getKeyFromValue` (`(value: T, value2: T, set: Set<T>) => K`): 从值生成键的函数。

#### 返回值

(`Map<K, T>`): 返回一个Map,其中生成的键映射到每个元素的值。
