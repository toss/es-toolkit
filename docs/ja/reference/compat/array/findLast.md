# findLast (Lodash互換性)

::: warning `Array.prototype.findLast`を使用してください

この`findLast`関数は、さまざまな型と特殊な条件処理により複雑で動作が遅くなります。

代わりに、より高速で現代的な`Array.prototype.findLast`を使用してください。

:::

配列またはオブジェクトで条件を満たす最後の要素を見つけます。

```typescript
const lastEven = findLast(array, predicate);
```

## 参照

### `findLast(collection, predicate?, fromIndex?)`

配列またはオブジェクトで与えられた条件を満たす最後の要素を見つけます。配列の末尾から逆順に検索し、条件を満たす最初の要素を返します。

```typescript
import { findLast } from 'es-toolkit/compat';

// 関数で条件を指定
const users = [
  { user: 'barney', age: 36 },
  { user: 'fred', age: 40 },
  { user: 'pebbles', age: 18 },
];
findLast(users, o => o.age < 40);
// => { user: 'pebbles', age: 18 }

// オブジェクトで条件を指定
findLast(users, { age: 36 });
// => { user: 'barney', age: 36 }

// キー値ペアで条件を指定
findLast(users, ['age', 18]);
// => { user: 'pebbles', age: 18 }

// プロパティ名で条件を指定（真として評価される値を持つ最後の要素）
findLast(users, 'age');
// => { user: 'fred', age: 40 }
```

検索開始インデックスを指定することもできます。

```typescript
import { findLast } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
findLast(numbers, n => n > 3, 6); // インデックス6から逆順検索
// => 4
```

`null`または`undefined`は空の結果を返します。

```typescript
import { findLast } from 'es-toolkit/compat';

findLast(null, x => x > 0); // undefined
findLast(undefined, x => x > 0); // undefined
```

#### パラメータ

- `collection` (`ArrayLike<T> | Record<string, T> | null | undefined`): 検索する配列またはオブジェクトです。
- `predicate` (`ListIterateeCustom<T, boolean>`, オプション): 各要素に適用する条件です。関数、オブジェクト、キー値ペア、またはプロパティ名を使用できます。デフォルトは`identity`関数です。
- `fromIndex` (`number`, オプション): 検索を開始するインデックスです。負の場合は末尾から計算します。デフォルトは配列の最後のインデックスです。

#### 戻り値

(`T | undefined`): 条件を満たす最後の要素を返します。条件を満たす要素がない場合は`undefined`を返します。
