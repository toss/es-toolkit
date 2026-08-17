# iterate (`Iterator`向け)

シード値に関数を繰り返し適用して、無限の遅延評価イテレータを作成します。

```typescript
const sequence = iterate(seed, getNext);
```

## 使用法

### `iterate(seed, getNext)`

前の値から次の値が導かれるシーケンスを生成するには `iterate` を使用してください。累乗、連続する日付、リトライの待機時間などです。シーケンスは `seed` から始まり、`getNext(seed)`、`getNext(getNext(seed))` と続いていきます。イテレータが消費される前には何も計算されず、`getNext` は取り出された値の数だけしか実行されません。

イテレータは無限であるため、消費する前にネイティブの `take` や [`takeWhile`](./takeWhile.md) のような途中で打ち切れるヘルパーで範囲を区切る必要があります。

```typescript
import { iterate } from 'es-toolkit/iterator';

// 2 の累乗を take で区切ります。
iterate(1, x => x * 2)
  .take(5)
  .toArray();
// 結果: [1, 2, 4, 8, 16]

// 1 分未満の指数バックオフの待機時間です。
import { takeWhile } from 'es-toolkit/iterator';

takeWhile(iterate(100, x => x * 2), x => x < 60000).toArray();
// 結果: [100, 200, 400, ..., 51200]
```

#### パラメータ

- `seed` (`T`): シーケンスの最初の値です。
- `getNext` (`(value: T) => T`): 現在の値から次の値を計算します。

#### 戻り値

(`IteratorObject<T, undefined>`): 生成されるシーケンスの無限の遅延評価イテレータです。ネイティブのイテレータヘルパー（`map`、`take`、`toArray` など）をすべて備えているため、そのままチェーンを続けられます。
