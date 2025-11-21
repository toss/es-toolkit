# dropWhile (Lodash 互換性)

::: warning `es-toolkit` の `dropWhile` を使用してください

この `dropWhile` 関数は、`null` や `undefined` の処理、`ArrayLike` 型の処理、様々な条件関数形式のサポートなどにより遅く動作します。

代わりに、より高速で現代的な `es-toolkit` の [`dropWhile`](../../array/dropWhile.md) を使用してください。

:::

条件関数に基づいて配列の先頭から要素を削除します。

```typescript
const result = dropWhile(array, predicate);
```

## 使用法

### `dropWhile(array, predicate)`

配列の先頭から特定の条件を満たす要素を連続して削除したい場合に `dropWhile` を使用します。条件関数が `false` を返すと削除を中断します。

```typescript
import { dropWhile } from 'es-toolkit/compat';

// 関数を条件として使用します。
dropWhile([1, 2, 3, 4, 5], n => n < 3);
// 戻り値: [3, 4, 5]

// オブジェクトパターンでマッチングします。
const users = [
  { name: 'alice', active: false },
  { name: 'bob', active: false },
  { name: 'charlie', active: true },
];

dropWhile(users, { active: false });
// 戻り値: [{ name: 'charlie', active: true }]

// 配列形式でプロパティと値を指定します。
dropWhile(users, ['active', false]);
// 戻り値: [{ name: 'charlie', active: true }]

// プロパティ名で条件を確認します。
const items = [{ visible: false }, { visible: false }, { visible: true }];

dropWhile(items, 'visible');
// 戻り値: [{ visible: false }, { visible: false }, { visible: true }]
```

`null` または `undefined` は空の配列として処理されます。

```typescript
import { dropWhile } from 'es-toolkit/compat';

dropWhile(null, x => x > 0); // []
dropWhile(undefined, x => x > 0); // []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 要素を削除する配列です。
- `predicate` (`ListIteratee<T>`, オプション): 各要素に適用する条件関数です。関数、オブジェクトパターン、配列パターン、またはプロパティ名を受け取ることができます。デフォルトは `identity` です。

#### 戻り値

(`T[]`): 条件を満たさない最初の要素からの新しい配列を返します。
