# at (関数型プログラミング)

指定したインデックスにある値を返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, at(indices));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`at`](../../reference/array/at.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`at` は `indices` の各インデックスにある値をパイプされた配列から読み取ります。負のインデックスは `Array.prototype.at` と同じく末尾から数えます。

```typescript
import { at, pipe } from 'es-toolkit/fp';

pipe(['a', 'b', 'c'], at([0, -1])); // => ['a', 'c']
```

#### パラメータ

- `indices` (`number[]`): パイプされた配列から読み取るインデックスです。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を選択された値の配列に変換する関数です。
