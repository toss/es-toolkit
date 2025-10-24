# takeRightWhile (Lodash 互換性)

::: warning `es-toolkit`の[takeRightWhile](../../array/takeRightWhile.md)を使用してください

この`takeRightWhile`関数は、`null`や`undefined`の処理などにより遅く動作します。

代わりに、より高速で現代的な`es-toolkit`の[takeRightWhile](../../array/takeRightWhile.md)を使用してください。

:::

条件を満たす間、配列の末尾から要素を取得します。

```typescript
const result = takeRightWhile(array, predicate);
```

## 参照

### `takeRightWhile(array, predicate)`

配列の末尾から開始して条件を満たす間、要素を取得して新しい配列を作成したい場合は`takeRightWhile`を使用してください。条件が偽と評価されると停止します。

```typescript
import { takeRightWhile } from 'es-toolkit/compat';

// 関数条件を使用
const numbers = [1, 2, 3, 4, 5];
takeRightWhile(numbers, x => x > 3);
// Returns: [4, 5]

// オブジェクトプロパティ条件を使用
const users = [
  { user: 'barney', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: false },
];

takeRightWhile(users, o => !o.active);
// Returns: [{ user: 'fred', active: false }, { user: 'pebbles', active: false }]

// 部分オブジェクトで条件マッチング
takeRightWhile(users, { active: false });
// Returns: [{ user: 'pebbles', active: false }]

// プロパティ-値配列で条件マッチング
takeRightWhile(users, ['active', false]);
// Returns: [{ user: 'fred', active: false }, { user: 'pebbles', active: false }]

// プロパティ名で真と評価される値を確認
const items = [{ active: false }, { active: true }, { active: true }];
takeRightWhile(items, 'active');
// Returns: [{ active: true }, { active: true }]
```

`null`や`undefined`は空の配列として扱われます。

```typescript
import { takeRightWhile } from 'es-toolkit/compat';

takeRightWhile(null, x => x > 0); // []
takeRightWhile(undefined, x => x > 0); // []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 処理する配列です。
- `predicate` (`ListIteratee<T>`, オプション): 各要素に対して実行する条件です。関数、部分オブジェクト、プロパティ-値配列、プロパティ名を使用できます。デフォルトは恒等関数です。

#### 戻り値

(`T[]`): 条件を満たす間、配列の末尾から取得した要素の新しい配列を返します。
