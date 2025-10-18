# dropRightWhile (Lodash 互換性)

::: warning `es-toolkit` の `dropRightWhile` を使用してください

この `dropRightWhile` 関数は、`null` や `undefined` の処理、`ArrayLike` 型の処理、様々な条件関数形式のサポートなどにより遅く動作します。

代わりに、より高速で現代的な `es-toolkit` の [`dropRightWhile`](../../array/dropRightWhile.md) を使用してください。

:::

条件関数に基づいて配列の末尾から要素を削除します。

```typescript
const result = dropRightWhile(array, predicate);
```

## 参照

### `dropRightWhile(array, predicate)`

配列の末尾から特定の条件を満たす要素を連続して削除したい場合に `dropRightWhile` を使用します。条件関数が `false` を返すと削除を中断します。

```typescript
import { dropRightWhile } from 'es-toolkit/compat';

// 関数を条件として使用します。
const users = [
  { user: 'barney', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: false },
];

dropRightWhile(users, user => !user.active);
// 戻り値: [{ user: 'barney', active: true }]

// オブジェクトパターンでマッチングします。
dropRightWhile(users, { user: 'pebbles', active: false });
// 戻り値: [{ user: 'barney', active: true }, { user: 'fred', active: false }]

// 配列形式でプロパティと値を指定します。
dropRightWhile(users, ['active', false]);
// 戻り値: [{ user: 'barney', active: true }]

// プロパティ名で条件を確認します。
dropRightWhile(users, 'active');
// 戻り値: [{ user: 'barney', active: true }]
```

`null` または `undefined` は空の配列として処理されます。

```typescript
import { dropRightWhile } from 'es-toolkit/compat';

dropRightWhile(null, x => x > 0); // []
dropRightWhile(undefined, x => x > 0); // []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 要素を削除する配列です。
- `predicate` (`ListIteratee<T>`, オプション): 各要素に適用する条件関数です。関数、オブジェクトパターン、配列パターン、またはプロパティ名を受け取ることができます。

#### 戻り値

(`T[]`): 条件を満たさない最初の要素からの新しい配列を返します。
