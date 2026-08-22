# partition (`Iterator`)

イテレータを消費し、条件によって要素を 2 つの配列に分割します。

```typescript
const [matched, unmatched] = partition(source, predicate);
```

## 使用法

### `partition(source, predicate)`

遅延評価のパイプラインの要素を、1 回の走査で 2 つのグループに分けたいときに `partition` を使用してください。たとえば、有効なレコードと無効なレコードに分ける場合などです。最初の配列には `predicate` が真と評価される値を返した要素が入り、2 番目の配列には残りの要素が入ります。各グループの中では相対的な順序が保たれます。これは終端操作です。すべての要素を取り出すため、無限イテレータに対して使用してはいけません。

```typescript
import { partition } from 'es-toolkit/iterator';

// 数を偶数と奇数に分割します。
partition([1, 2, 3, 4].values(), x => x % 2 === 0);
// 結果: [[2, 4], [1, 3]]

// 各グループの中では順序が保たれます。
partition([3, 1, 4, 1, 5, 9, 2].values(), x => x > 3);
// 結果: [[4, 5, 9], [3, 1, 1, 2]]
```

#### パラメータ

- `source` (`Iterator<T>`): 分割するイテレータです。
- `predicate` (`(value: T, index: number) => boolean`): 各要素とそのインデックスとともに呼び出されます。真と評価される値を返すと、その要素は最初の配列に入ります。

#### 戻り値

(`[T[], T[]]`): 条件を満たした要素の配列と、満たさなかった要素の配列からなる 2 要素のタプル（`[matched, unmatched]`）です。

### `pipe` と一緒に使う `partition(predicate)`

[`pipe`](../../fp/reference/pipe.md) で変換をつなげるときは、`es-toolkit/fp/iterator` からカリー化された形式をインポートし、終端操作として使用してください。

```typescript
import { pipe } from 'es-toolkit/fp';
import { partition } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 4].values(),
  partition(x => x % 2 === 0)
);
// 結果: [[2, 4], [1, 3]]
```
