# reduce (`Iterator`向け)

イテレータを畳み込んで 1 つの値にする関数を作成します。関数型プログラミングの [`pipe`](../../fp/reference/pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, reduce(callback, initial));
```

::: info

パイプラインとして組み合わせない通常のコードでは、ネイティブの [`Iterator.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/reduce)（`source.reduce(callback, initial)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `reduce(callback, initial)`

`reduce` は終端操作です。すべての要素を取り出しながらアキュムレータを `callback` に順に通していき、最終的なアキュムレータを返します。イテレータ全体を消費するため、無限イテレータに対して使用してはいけません。最終結果だけでなく、すべての中間のアキュムレータを残したい場合は、[`scan`](./scan.md) を使用してください。ネイティブの `Iterator.prototype.reduce` に処理を委譲します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, reduce } from 'es-toolkit/fp/iterator';

// 2 倍にした要素を合計します。
pipe(
  [1, 2, 3].values(),
  map(x => x * 2),
  reduce((acc, x) => acc + x, 0)
);
// 結果: 12
```

#### パラメータ

- `callback` (`(accumulator: U, value: T, index: number) => U`): 現在のアキュムレータ、各要素、そのインデックスとともに呼び出されます。次のアキュムレータを返します。
- `initial` (`U`): アキュムレータの初期値です。

#### 戻り値

(`(source: Iterator<T>) => U`): イテレータを消費し、最終的なアキュムレータを返す関数です。
