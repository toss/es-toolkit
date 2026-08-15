# flatten (関数型プログラミング)

ネストした配列を指定した深さまで平坦化する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, flatten(depth));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`flatten`](../../reference/array/flatten.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`flatten` はパイプされた配列を `depth` の深さまで平坦化します。`depth` を省略すると 1 段階だけ平坦化します。1 段階の平坦化は [`pipe`](./pipe.md) の中で遅延評価に対応しています。

```typescript
import { flatten, pipe } from 'es-toolkit/fp';

pipe([[1], [2, 3], [4]], flatten()); // => [1, 2, 3, 4]
```

#### パラメータ

- `depth` (`number, optional`): 平坦化する深さです。デフォルトは `1` です。

#### 戻り値

(`(array: readonly T[]) => Array<FlatArray<T[], D>>`): ネストした配列を平坦化した配列に変換する関数です。
