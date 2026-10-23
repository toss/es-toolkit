# scan (`Iterator`)

イテレータの累積結果を遅延的に生成する関数を作成します。関数型プログラミングの [`pipe`](../pipe.md) と一緒に使用します。

```typescript
const result = pipe(source, scan(callback, initial));
```

::: info

パイプラインとして組み合わせない通常のコードでは、`es-toolkit/iterator` の [`scan`](../../../reference/iterator/scan.md)（`scan(source, callback, initial)`）を使うのがおすすめです。`pipe` で変換をつなげるときは、この `es-toolkit/fp/iterator` 版を使用してください。

:::

## 使用法

### `scan(callback, initial)`

`scan` はコールバックと初期値を受け取り、最初に `initial` を出力し、その後は各要素を処理するたびにアキュムレータを出力する関数を返します。すべての中間結果も出力する [`reduce`](./reduce.md) のように動作します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { scan, toArray } from 'es-toolkit/fp/iterator';

// 累計を出力します。
pipe(
  [1, 2, 3].values(),
  scan((acc, x) => acc + x, 0),
  toArray()
);
// 結果: [0, 1, 3, 6]
```

#### パラメータ

- `callback` (`(accumulator: U, value: T, index: number) => U`): 現在のアキュムレータ、各要素、そのインデックスとともに呼び出されます。次のアキュムレータを返します。
- `initial` (`U`): アキュムレータの初期値で、最初の値として出力されます。

#### 戻り値

(`(source: Iterator<T>) => IteratorObject<U, undefined>`): イテレータを、初期値と、続く各アキュムレータを生成する遅延評価のイテレータに変換する関数です。
