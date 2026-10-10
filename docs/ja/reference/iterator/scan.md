# scan (`Iterator`)

イテレータの累積結果を遅延的に生成します。すべての中間結果を出力する `reduce` のようなものです。

```typescript
const accumulated = scan(source, callback, initial);
```

## 使用法

### `scan(source, callback, initial)`

最終結果だけでなく、畳み込みのすべての中間値が必要なときに `scan` を使用してください。累計、累積の最大値、ステートマシンなどです。最初に `initial` の値が出力され、その後、各要素を処理するたびのアキュムレータが続きます。そのため、長さ `n` の入力からは `n + 1` 個の値が生成されます。この「scan-left」の動作に相当するネイティブのイテレータヘルパーはありません。

```typescript
import { scan } from 'es-toolkit/iterator';

// 初期値から始まる累計です。
scan([1, 2, 3].values(), (acc, x) => acc + x, 0).toArray();
// 結果: [0, 1, 3, 6]

// アキュムレータは要素と異なる型にできます。
scan(['a', 'b'].values(), (acc, x) => acc + x, '').toArray();
// 結果: ['', 'a', 'ab']
```

#### パラメータ

- `source` (`Iterator<T>`): 累積の対象となるイテレータです。
- `callback` (`(accumulator: U, value: T, index: number) => U`): 現在のアキュムレータ、各要素、そのインデックスとともに呼び出されます。次のアキュムレータを返します。
- `initial` (`U`): アキュムレータの初期値で、最初の値として出力されます。

#### 戻り値

(`IteratorObject<U, undefined>`): 初期値と、続く各アキュムレータを生成する遅延評価のイテレータです。ネイティブのイテレータヘルパー（`map`、`take`、`toArray` など）をすべて備えているため、そのままチェーンを続けられます。

### `pipe` と一緒に使う `scan(callback, initial)`

[`pipe`](../../fp/reference/pipe.md) で変換をつなげるときは、`es-toolkit/fp/iterator` からカリー化された形式をインポートしてください。コールバックと初期値を受け取り、イテレータを受け取る関数を返します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { scan, toArray } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3].values(),
  scan((acc, x) => acc + x, 0),
  toArray()
);
// 結果: [0, 1, 3, 6]
```
