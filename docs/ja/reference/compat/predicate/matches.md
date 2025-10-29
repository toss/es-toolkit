# matches (Lodash 互換性)

与えられたパターンと部分的に一致するかどうかを確認する関数を作成します。

```typescript
const matcher = matches(pattern);
```

## 参照

### `matches(source)`

オブジェクトや配列の構造と値が特定のパターンと一致するかどうかを確認する関数を作成する際に `matches` を使用してください。配列のフィルタリングやオブジェクト検索で便利です。

```typescript
import { matches } from 'es-toolkit/compat';

// オブジェクトパターンマッチング
const userMatcher = matches({ age: 25, department: 'Engineering' });

const users = [
  { name: 'Alice', age: 25, department: 'Engineering' },
  { name: 'Bob', age: 30, department: 'Marketing' },
  { name: 'Charlie', age: 25, department: 'Engineering' },
];

const engineeringUsers = users.filter(userMatcher);
// [{ name: 'Alice', age: 25, department: 'Engineering' },
//  { name: 'Charlie', age: 25, department: 'Engineering' }]

// ネストしたオブジェクトパターン
const profileMatcher = matches({
  profile: { city: 'Seoul', verified: true },
});

const profiles = [
  { name: 'Kim', profile: { city: 'Seoul', verified: true, score: 100 } },
  { name: 'Lee', profile: { city: 'Busan', verified: true } },
  { name: 'Park', profile: { city: 'Seoul', verified: false } },
];

const seoulVerifiedUsers = profiles.filter(profileMatcher);
// [{ name: 'Kim', profile: { city: 'Seoul', verified: true, score: 100 } }]

// 配列パターンマッチング
const arrayMatcher = matches([2, 4]);
const arrays = [
  [1, 2, 3, 4, 5],
  [2, 4, 6],
  [1, 3, 5],
];
const matchingArrays = arrays.filter(arrayMatcher);
// [[1, 2, 3, 4, 5], [2, 4, 6]]

// 空のパターンはすべての値とマッチ
const emptyMatcher = matches({});
emptyMatcher({ anything: 'value' }); // true
emptyMatcher([]); // true
emptyMatcher(null); // true
```

#### パラメータ

- `source` (`unknown`): 一致パターンとなるオブジェクトや値です。

#### 戻り値

(`(target: unknown) => boolean`): 与えられた値がパターンと部分的に一致するかどうかを確認する関数を返します。
