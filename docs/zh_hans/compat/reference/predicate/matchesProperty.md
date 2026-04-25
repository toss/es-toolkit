# matchesProperty (Lodash 兼容性)

创建一个函数来检查特定属性是否与给定值匹配。

```typescript
const checker = matchesProperty(path, value);
```

## 用法

### `matchesProperty(property, source)`

当您想创建一个函数来检查对象的特定属性是否与给定值匹配时使用 `matchesProperty`。在数组过滤或对象搜索中很有用。

```typescript
import { matchesProperty } from 'es-toolkit/compat';

// 简单属性检查
const checkName = matchesProperty('name', 'Alice');

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 35 },
];

const aliceUsers = users.filter(checkName);
// [{ name: 'Alice', age: 25 }, { name: 'Alice', age: 35 }]

// 嵌套属性检查（数组路径）
const checkCity = matchesProperty(['address', 'city'], 'Seoul');

const profiles = [
  { name: 'Kim', address: { city: 'Seoul', district: 'Gangnam' } },
  { name: 'Lee', address: { city: 'Busan', district: 'Haeundae' } },
  { name: 'Park', address: { city: 'Seoul', district: 'Mapo' } },
];

const seoulUsers = profiles.filter(checkCity);
// [{ name: 'Kim', address: { city: 'Seoul', district: 'Gangnam' } },
//  { name: 'Park', address: { city: 'Seoul', district: 'Mapo' } }]

// 用字符串表示深层路径
const checkScore = matchesProperty('stats.game.score', 100);

const players = [
  { name: 'Player1', stats: { game: { score: 100, level: 5 } } },
  { name: 'Player2', stats: { game: { score: 95, level: 4 } } },
  { name: 'Player3', stats: { game: { score: 100, level: 6 } } },
];

const perfectScorers = players.filter(checkScore);
// [{ name: 'Player1', stats: { game: { score: 100, level: 5 } } },
//  { name: 'Player3', stats: { game: { score: 100, level: 6 } } }]

// 与复杂对象匹配
const checkRole = matchesProperty('role', { type: 'admin', permissions: ['read', 'write'] });

const accounts = [
  { user: 'Alice', role: { type: 'admin', permissions: ['read', 'write'] } },
  { user: 'Bob', role: { type: 'user', permissions: ['read'] } },
  { user: 'Charlie', role: { type: 'admin', permissions: ['read', 'write'] } },
];

const admins = accounts.filter(checkRole);
// [{ user: 'Alice', role: { type: 'admin', permissions: ['read', 'write'] } },
//  { user: 'Charlie', role: { type: 'admin', permissions: ['read', 'write'] } }]
```

#### 参数

- `property` (`PropertyKey | PropertyKey[]`): 要检查的属性路径。可以使用字符串、数组或点分隔路径。
- `source` (`unknown`): 要与属性值比较的值。

#### 返回值

(`(target: unknown) => boolean`): 返回一个函数，用于检查给定对象的属性是否与值匹配。
