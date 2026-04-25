# findLastKey (Lodash 互換性)

::: warning `Array.findLast()`と`Object.keys()`を使用してください

この `findLastKey` 関数は、様々な条件タイプの処理と互換性ロジックにより複雑に動作します。

代わりに、より高速で現代的な `Array.findLast()` と `Object.keys()` を使用してください。

:::

条件に一致する最後の要素のキーを末尾から探します。

```typescript
const key = findLastKey(obj, predicate);
```

## 使用法

### `findLastKey(obj, predicate)`

オブジェクトで条件に一致する最後の要素のキーを見つけるために `findLastKey` を使用してください。`findKey` とは逆に、末尾から検索します。関数、オブジェクト、配列、文字列など、様々な形式の条件を使用できます。

```typescript
import { findLastKey } from 'es-toolkit/compat';

// 関数条件でキーを見つける
const users = {
  alice: { age: 25, active: true },
  bob: { age: 30, active: false },
  charlie: { age: 35, active: true },
};

findLastKey(users, user => user.active);
// 戻り値: 'charlie' (末尾から見つけた最初の active: true)

// オブジェクト条件でキーを見つける
findLastKey(users, { active: true });
// 戻り値: 'charlie'

// プロパティパスでキーを見つける
findLastKey(users, 'active');
// 戻り値: 'charlie'

// プロパティ-値配列でキーを見つける
findLastKey(users, ['active', false]);
// 戻り値: 'bob'
```

条件に一致する要素がない場合は `undefined` を返します。

```typescript
import { findLastKey } from 'es-toolkit/compat';

findLastKey({ a: 1, b: 2 }, value => value > 5);
// 戻り値: undefined
```

#### パラメータ

- `obj` (`T | null | undefined`): 検索するオブジェクトです。
- `predicate` (`ObjectIteratee<T>`, オプション): 各要素に適用する条件です。関数、オブジェクト、配列、文字列が使用できます。

#### 戻り値

(`string | undefined`): 条件に一致する最後の要素のキーを返します。見つからない場合は `undefined` を返します。
