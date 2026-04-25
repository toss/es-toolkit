# takeWhile (Lodash 互換性)

::: warning `es-toolkit`の[takeWhile](../../array/takeWhile.md)を使用してください

この`takeWhile`関数は、`null`や`undefined`の処理などにより遅く動作します。

代わりに、より高速で現代的な`es-toolkit`の[takeWhile](../../array/takeWhile.md)を使用してください。

:::

条件を満たす間、配列の先頭から要素を取得します。

```typescript
const result = takeWhile(array, predicate);
```

## 使用法

### `takeWhile(array, predicate)`

配列の開始から条件を満たす間、要素を取得して新しい配列を作成したい場合は`takeWhile`を使用してください。条件が偽と評価されると停止します。

```typescript
import { takeWhile } from 'es-toolkit/compat';

// 関数条件を使用
const numbers = [1, 2, 3, 4, 5];
takeWhile(numbers, x => x < 3);
// Returns: [1, 2]

// オブジェクトプロパティ条件を使用
const users = [
  { user: 'barney', active: false },
  { user: 'fred', active: false },
  { user: 'pebbles', active: true },
];

takeWhile(users, o => !o.active);
// Returns: [{ user: 'barney', active: false }, { user: 'fred', active: false }]

// 部分オブジェクトで条件マッチング
takeWhile(users, { active: false });
// Returns: [{ user: 'barney', active: false }]

// プロパティ-値配列で条件マッチング
takeWhile(users, ['active', false]);
// Returns: [{ user: 'barney', active: false }, { user: 'fred', active: false }]

// プロパティ名で真と評価される値を確認
const items = [{ active: true }, { active: true }, { active: false }];
takeWhile(items, 'active');
// Returns: [{ active: true }, { active: true }]
```

`null`や`undefined`は空の配列として扱われます。

```typescript
import { takeWhile } from 'es-toolkit/compat';

takeWhile(null, x => x > 0); // []
takeWhile(undefined, x => x > 0); // []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 処理する配列です。
- `predicate` (`ListIteratee<T>`, オプション): 各要素に対して実行する条件です。関数、部分オブジェクト、プロパティ-値配列、プロパティ名を使用できます。デフォルトは恒等関数です。

#### 戻り値

(`T[]`): 条件を満たす間、配列の先頭から取得した要素の新しい配列を返します。
