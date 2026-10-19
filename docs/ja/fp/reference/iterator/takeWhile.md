# takeWhile (`Iterator`)

条件が成り立つ間、イテレータの先頭の要素を遅延的に生成する関数を作成します。関数型プログラミングの [`pipe`](../pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, takeWhile(shouldContinue));
```

::: info

パイプラインとして組み合わせない通常のコードでは、`es-toolkit/iterator` の [`takeWhile`](../../../reference/iterator/takeWhile.md)（`takeWhile(source, shouldContinue)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `takeWhile(shouldContinue)`

`takeWhile` は条件関数を受け取り、条件関数が真と評価される値を返す間、要素を生成する関数を返します。偽と評価される値を返した最初の要素でイテレーションが停止し、ソースの残りの要素が取り出されることはありません。そのため、無限イテレータを区切るのに使えます。条件ではなく決まった個数で止めたい場合は、[`take`](./take.md) を使用してください。

```typescript
import { pipe } from 'es-toolkit/fp';
import { takeWhile, toArray } from 'es-toolkit/fp/iterator';

// 先頭にある 3 未満の数を取り出します。
pipe(
  [1, 2, 3, 1].values(),
  takeWhile(x => x < 3),
  toArray()
);
// 結果: [1, 2]
```

#### パラメータ

- `shouldContinue` (`(value: T, index: number) => boolean`): 各要素とそのインデックスとともに呼び出されます。偽と評価される値を返すと、イテレーションが停止します。

#### 戻り値

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): イテレータを、条件を満たす先頭の連続した要素を生成する遅延評価のイテレータに変換する関数です。
