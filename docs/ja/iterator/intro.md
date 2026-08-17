# es-toolkit/iterator

`es-toolkit/iterator` は、JavaScript のイテレータのための遅延評価ヘルパーを提供します。ステップごとに中間配列を作る代わりに、イテレータのパイプラインは要素を 1 つずつ処理し、実際に消費される分だけ処理を行います。

```typescript
import { takeWhile } from 'es-toolkit/iterator';

takeWhile(hugeArray.values(), x => x < 100)
  .map(expensiveTransform) // ネイティブのイテレータヘルパー
  .toArray();
// `expensiveTransform` は 100 未満の先頭の要素に対してだけ実行されます。
```

## es-toolkit/iterator の関数の仕組み

すべての関数は、最初の引数として `Iterator` を受け取ります。これは `array.values()` から得られる値、ジェネレータ関数、`Map`/`Set` のイテレータなどです。遅延評価の関数は、ネイティブの `Iterator.prototype` をプロトタイプに持つ `IteratorObject` を返すため、結果はすべての[ネイティブのイテレータヘルパー](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)（`map`、`filter`、`take`、`drop`、`flatMap`、`reduce`、`toArray` など）を備えており、それらとシームレスにチェーンできます。

このモジュールは、ネイティブのヘルパーに欠けているものだけを提供します。個数ベースの `take` と `drop`、`map`、`filter` などはすでに `Iterator.prototype` に存在します。es-toolkit はその上に、条件ベースの操作、状態を持つ操作、複数のソースを扱う操作を追加します。[`chunk`](./reference/chunk.md)、[`count`](./reference/count.md)、[`dropWhile`](./reference/dropWhile.md)、[`head`](./reference/head.md)、[`iterate`](./reference/iterate.md)、[`partition`](./reference/partition.md)、[`range`](./reference/range.md)、[`scan`](./reference/scan.md)、[`takeWhile`](./reference/takeWhile.md)、[`uniqBy`](./reference/uniqBy.md)、[`zip`](./reference/zip.md) です。

## 遅延評価と無限シーケンス

要求される前に計算される要素はありません。ネイティブの `take` のような途中で打ち切れるヘルパーと組み合わせることで、無限シーケンスを実用的に扱えます。

```typescript
import { iterate } from 'es-toolkit/iterator';

// 2 の累乗を、必要になった時点で生成します。
iterate(1, x => x * 2)
  .take(5)
  .toArray(); // => [1, 2, 4, 8, 16]
```

## 一度しか消費できない性質

JavaScript のすべてのイテレータと同じく、結果は一度しか消費できません。一度消費されると、それ以上何も生成しません。パイプラインが早期に停止したとき — `take` の上限に達した、`for...of` ループが `break` した、コールバックが例外を投げた、といった場合 — ソースのイテレータは `return` メソッドを通じて閉じられるため、ジェネレータのソースにある `try/finally` のクリーンアップが確実に実行されます。

```typescript
import { chunk } from 'es-toolkit/iterator';

function* lines() {
  const file = open('data.txt');
  try {
    yield* file.readLines();
  } finally {
    file.close(); // 消費側が早期に停止しても実行されます。
  }
}

chunk(lines(), 100).take(2).toArray();
```

## pipe と一緒に使う

すべての操作は、[`pipe`](../fp/reference/pipe.md) と一緒に使えるように、カリー化された形式で `es-toolkit/fp/iterator` からも提供されています。あわせて、ネイティブのヘルパー（`map`、`filter`、`take` など）の pipe 向けラッパーも用意されています。

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, map, take, toArray } from 'es-toolkit/fp/iterator';

pipe(
  hugeArray.values(),
  filter(x => x % 2 === 0),
  map(x => x * 10),
  take(2),
  toArray()
); // => [20, 40]
```

## es-toolkit との関係

データがすでに配列で、全体を処理する場合は、[`es-toolkit`](/ja/intro) の配列関数が適切なデフォルトです。入力が大きい、または無限である場合、パイプラインが早期に終了しうる場合、データがすでにイテレータやジェネレータとして届く場合は、`es-toolkit/iterator` を使ってください。
