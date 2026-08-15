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

## なぜ es-toolkit/fp なのか

- **読みやすい** — 各ステップが実行される順に上から下へ読めます。`take(map(filter(xs)))` を内側から解読する必要も、ステップ間の一時変数も不要です。
- **速い** — 連続するステップは 1 回の走査に融合され、途中に中間配列を作りません。結果が十分に集まった時点で走査自体が止まります。仕組みは下の[遅延評価](#遅延評価)で実際に確認できます。
- **損はしない** — 融合が効かない場合、`pipe` はネイティブの配列メソッドをそのまま実行します。`xs.filter().map()` より遅くなることはなく、しばしば大幅に速くなるだけです。

## es-toolkit/fp の関数の仕組み

`es-toolkit/fp` のすべての関数は、その設定（たとえば `map(fn)` や `take(2)`）とともに呼び出され、データを受け取る関数を返します。`pipe` がそのデータを渡し、各ステップの結果を次のステップへとつなげていきます。

```typescript
import { map, pipe } from 'es-toolkit/fp';

const triple = map((x: number) => x * 3); // (array) => number[]

pipe([1, 2, 3], triple); // => [3, 6, 9]
```

各ステップがこのように「データを待つ関数」であるため、`pipe` は実行を始める前にパイプライン全体の形を把握できます。これが遅延評価の出発点です。

## 遅延評価

先ほど「速い」と言った理由が、この遅延評価です。遅延評価に対応した関数（`map`、`filter`、`take` など）が連続して並ぶと、`pipe` はそれらを 1 回の走査に融合します。配列全体がステップを 1 つずつ順番に通過するのではなく、要素 1 つがすべてのステップを一度に通過します。そのためステップ間に中間配列は生まれず、末尾の `take` が満たされた瞬間に走査全体が止まります。

以下の 2 つのパネルは**同じパイプライン**を実行します。**Eager** はステップごとに配列全体を処理し、そのたびに新しい配列を割り当てます。**Lazy fusion** は要素を 1 つずつ最後まで通し、`take(2)` が満たされた時点で止まります — `5` と `6` は一度も処理されず、中間配列も作られません。

<FpLazySimulation />

入力が大きいほど、そして `take` が早く満たされるほど、この差は大きくなります。配列全体に触れるか、先頭部分だけに触れるかの違いだからです:

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
