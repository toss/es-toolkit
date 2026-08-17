# take (`Iterator`向け)

イテレータの先頭 `limit` 個の要素を遅延的に生成する関数を作成します。関数型プログラミングの [`pipe`](../../fp/reference/pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, take(limit));
```

::: info

パイプラインとして組み合わせない通常のコードでは、ネイティブの [`Iterator.prototype.take`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/take)（`source.take(limit)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `take(limit)`

`take` はパイプラインを最大 `limit` 個の要素に制限します。上限に達するとソースが閉じられ、それ以上要素は取り出されません。これが、無限イテレータの有限な先頭部分を消費する標準的な方法です。ネイティブの `Iterator.prototype.take` に処理を委譲します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, take, toArray } from 'es-toolkit/fp/iterator';

// 先頭の 3 個の要素だけが変換されます。
pipe([1, 2, 3, 4, 5].values(), map(x => x * 2), take(3), toArray());
// 結果: [2, 4, 6]
```

#### パラメータ

- `limit` (`number`): 生成する要素の最大数です。非負の数である必要があります。

#### 戻り値

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): イテレータを、最大 `limit` 個の先頭の要素を生成する遅延評価のイテレータに変換する関数です。

#### エラー

`limit` が負または `NaN` の場合、`RangeError` を投げます（ネイティブの動作です）。
