# matchesProperty (Lodash 互換性)

特定のプロパティが与えられた値と一致するかどうかを確認する関数を作成します。

```typescript
const checker = matchesProperty(path, value);
```

## 使用法

### `matchesProperty(property, source)`

オブジェクトの特定のプロパティが与えられた値と一致するかどうかを確認する関数を作成する際に `matchesProperty` を使用してください。配列のフィルタリングやオブジェクト検索で便利です。

```typescript
import { matchesProperty } from 'es-toolkit/compat';

// 単純なプロパティ確認
const checkName = matchesProperty('name', 'Alice');

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 35 },
];

const aliceUsers = users.filter(checkName);
// [{ name: 'Alice', age: 25 }, { name: 'Alice', age: 35 }]

// ネストしたプロパティ確認（配列パス）
const checkCity = matchesProperty(['address', 'city'], 'Seoul');

const profiles = [
  { name: 'Kim', address: { city: 'Seoul', district: 'Gangnam' } },
  { name: 'Lee', address: { city: 'Busan', district: 'Haeundae' } },
  { name: 'Park', address: { city: 'Seoul', district: 'Mapo' } },
];

const seoulUsers = profiles.filter(checkCity);
// [{ name: 'Kim', address: { city: 'Seoul', district: 'Gangnam' } },
//  { name: 'Park', address: { city: 'Seoul', district: 'Mapo' } }]

// 深いパスを文字列で表現
const checkScore = matchesProperty('stats.game.score', 100);

const players = [
  { name: 'Player1', stats: { game: { score: 100, level: 5 } } },
  { name: 'Player2', stats: { game: { score: 95, level: 4 } } },
  { name: 'Player3', stats: { game: { score: 100, level: 6 } } },
];

const perfectScorers = players.filter(checkScore);
// [{ name: 'Player1', stats: { game: { score: 100, level: 5 } } },
//  { name: 'Player3', stats: { game: { score: 100, level: 6 } } }]

// 複雑なオブジェクトとマッチング
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

#### パラメータ

- `property` (`PropertyKey | PropertyKey[]`): 確認するプロパティのパスです。文字列、配列、またはドットで区切られたパスを使用できます。
- `source` (`unknown`): プロパティ値と比較する値です。

#### 戻り値

(`(target: unknown) => boolean`): 与えられたオブジェクトのプロパティが値と一致するかどうかを確認する関数を返します。
