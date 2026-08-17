# drop (`Iterator`)

イテレータの先頭 `count` 個の要素を遅延的にスキップし、残りの要素を生成する関数を作成します。関数型プログラミングの [`pipe`](../../fp/reference/pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, drop(count));
```

::: info

パイプラインとして組み合わせない通常のコードでは、ネイティブの [`Iterator.prototype.drop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/drop)（`source.drop(count)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `drop(count)`

`drop` は先頭の決まった数の要素をスキップします。スキップされた要素はソースから取り出されますが、生成されることはありません。それ以降のすべての要素は遅延的にそのまま通過します。個数ではなく条件に基づいてスキップしたい場合は、[`dropWhile`](./dropWhile.md) を使用してください。ネイティブの `Iterator.prototype.drop` に処理を委譲します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { drop, toArray } from 'es-toolkit/fp/iterator';

// 先頭の 2 個の要素をスキップします。
pipe([1, 2, 3, 4, 5].values(), drop(2), toArray());
// 結果: [3, 4, 5]
```

#### パラメータ

- `count` (`number`): スキップする要素の数です。非負の数である必要があります。

#### 戻り値

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): イテレータを、残りの要素を生成する遅延評価のイテレータに変換する関数です。

#### エラー

`count` が負または `NaN` の場合、`RangeError` を投げます（ネイティブの動作です）。
