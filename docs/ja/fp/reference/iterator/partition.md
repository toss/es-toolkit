# partition (`Iterator`)

イテレータを消費し、条件によって要素を 2 つの配列に分割する関数を作成します。関数型プログラミングの [`pipe`](../pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, partition(predicate));
```

::: info

パイプラインとして組み合わせない通常のコードでは、`es-toolkit/iterator` の [`partition`](../../../reference/iterator/partition.md)（`partition(source, predicate)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `partition(predicate)`

`partition` はイテレータのパイプラインの終端操作です。すべての要素を取り出し、`predicate` が真と評価される値を返した要素は最初の配列に、それ以外の要素は 2 番目の配列に入れます。イテレータ全体を消費するため、無限イテレータに対して使用してはいけません。

```typescript
import { pipe } from 'es-toolkit/fp';
import { partition } from 'es-toolkit/fp/iterator';

// 数を偶数と奇数に分割します。
pipe(
  [1, 2, 3, 4].values(),
  partition(x => x % 2 === 0)
);
// 結果: [[2, 4], [1, 3]]
```

#### パラメータ

- `predicate` (`(value: T, index: number) => boolean`): 各要素とそのインデックスとともに呼び出されます。真と評価される値を返すと、その要素は最初の配列に入ります。

#### 戻り値

(`(source: Iterator<T>) => [T[], T[]]`): イテレータを消費し、条件を満たした要素の配列と、満たさなかった要素の配列からなるタプル（`[matched, unmatched]`）を返す関数です。
