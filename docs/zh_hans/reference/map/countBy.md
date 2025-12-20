# countBy (`Map`)

根据转换函数计算Map中项目的出现次数。

```typescript
const counts = countBy(map, mapper);
```

::: info

此函数仅可从 `es-toolkit/map` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `countBy(map, mapper)`

当您想计算Map中有多少条目属于不同类别时,请使用 `countBy`。提供一个从每个值-键对生成键的函数,它返回一个Map,其中生成的键及其计数作为值。对于转换产生相同键的每个条目,计数会递增。

```typescript
import { countBy } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 1],
]);

const result = countBy(map, value => value);
// 结果: Map(2) { 1 => 2, 2 => 1 }
```

可以根据各种标准计算条目。

```typescript
import { countBy } from 'es-toolkit/map';

// 按值属性计数
const users = new Map([
  ['user1', { name: 'Alice', age: 25, department: 'Engineering' }],
  ['user2', { name: 'Bob', age: 30, department: 'Engineering' }],
  ['user3', { name: 'Charlie', age: 35, department: 'Sales' }],
]);

const byDepartment = countBy(users, user => user.department);
// 结果: Map(2) { 'Engineering' => 2, 'Sales' => 1 }

// 按派生值计数
const ages = new Map([
  ['p1', 25],
  ['p2', 30],
  ['p3', 25],
  ['p4', 40],
]);

const ageGroups = countBy(ages, age => (age < 30 ? 'young' : 'senior'));
// 结果: Map(2) { 'young' => 2, 'senior' => 2 }

// 同时使用值和键进行计数
const items = new Map([
  ['alice', 20],
  ['bob', 30],
  ['carol', 20],
]);

const firstLetter = countBy(items, (value, key) => key[0]);
// 结果: Map(3) { 'a' => 1, 'b' => 1, 'c' => 1 }
```

#### 参数

- `map` (`Map<K, V>`): 要计算出现次数的Map。
- `mapper` (`(value: V, key: K, object: Map<K, V>) => K2`): 生成用于计数的键的函数。

#### 返回值

(`Map<K2, number>`): 返回包含映射键及其计数的Map。
