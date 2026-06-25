# es-toolkit/fp

`es-toolkit/fp` は es-toolkit の関数型プログラミング向けのエントリーポイントです。呼び出しをネストさせたり一時変数をやりくりしたりする代わりに、[`pipe`](./reference/pipe.md) を使ってデータ変換を読みやすい上から下へのパイプラインとして表現できます。

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4, 5, 6],
  filter(x => x % 2 === 0),
  map(x => x * 10),
  take(2)
); // => [20, 40]
```

## es-toolkit/fp の関数の仕組み

`es-toolkit/fp` のすべての関数は、その設定（たとえば `map(fn)` や `take(2)`）とともに呼び出され、データを受け取る関数を返します。`pipe` がそのデータを渡し、各ステップの結果を次のステップへとつなげていきます。

```typescript
import { map, pipe } from 'es-toolkit/fp';

const triple = map((x: number) => x * 3); // (array) => number[]

pipe([1, 2, 3], triple); // => [3, 6, 9]
```

## 遅延評価

遅延評価に対応した関数（`map`、`filter`、`take` など）が連続して並ぶと、`pipe` はそれらを 1 回の走査にまとめ、要素を 1 つずつ処理します。末尾の `take` は走査を早期に終了できるため、それより前の関数は残りの入力に対して実行されません。

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

pipe(
  hugeArray,
  map(expensiveTransform),
  filter(complexPredicate),
  // 結果が 2 件集まった時点で停止します。`hugeArray` の大部分は処理されません。
  take(2)
);
```

## es-toolkit との関係

`es-toolkit/fp` は `es-toolkit` の実装を再利用しており、変わるのは呼び出し方（`pipe` の中で呼び出す点）だけです。直接呼び出すスタイルが好みであれば、[`es-toolkit`](/ja/intro) を使ってください。移行中に Lodash の呼び出し箇所に合わせたい場合は、[`es-toolkit/compat`](/ja/compat/intro) を使ってください。
