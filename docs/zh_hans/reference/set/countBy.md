# countBy (`Set`)

根据转换函数计算Set中项目的出现次数。

```typescript
const counts = countBy(set, mapper);
```

::: info

此函数仅可从 `es-toolkit/set` 获得,以避免与其他集合类型的类似函数发生潜在冲突。

:::

## 用法

### `countBy(set, mapper)`

当您想计算Set中有多少元素属于不同类别时,请使用 `countBy`。提供一个从每个值生成键的函数,它返回一个Map,其中生成的键及其计数作为值。对于转换产生相同键的每个元素,计数会递增。

```typescript
import { countBy } from 'es-toolkit/set';

const set = new Set([1, 2, 3, 4, 5]);

const result = countBy(set, value => (value % 2 === 0 ? 'even' : 'odd'));
// 结果: Map(2) { 'odd' => 3, 'even' => 2 }
```

可以根据各种标准计算元素。

```typescript
import { countBy } from 'es-toolkit/set';

// 按字符串长度计数
const words = new Set(['apple', 'banana', 'cherry', 'date']);

const byLength = countBy(words, word => word.length);
// 结果: Map(3) { 5 => 1, 6 => 2, 4 => 1 }

// 按属性计数
const users = new Set([
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'user' },
  { name: 'Diana', role: 'admin' },
]);

const byRole = countBy(users, user => user.role);
// 结果: Map(2) { 'admin' => 2, 'user' => 2 }

// 按派生类别计数
const ages = new Set([15, 25, 35, 45, 55]);

const ageGroups = countBy(ages, age => {
  if (age < 18) return 'minor';
  if (age < 65) return 'adult';
  return 'senior';
});
// 结果: Map(2) { 'minor' => 1, 'adult' => 4 }
```

#### 参数

- `set` (`Set<T>`): 要计算出现次数的Set。
- `mapper` (`(value: T, value2: T, set: Set<T>) => K`): 生成用于计数的键的函数。

#### 返回值

(`Map<K, number>`): 返回包含映射键及其计数的Map。
