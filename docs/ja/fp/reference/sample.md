# sample (関数型プログラミング)

配列からランダムな値を返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, sample());
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`sample`](../../reference/array/sample.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`sample` はパイプされた配列からランダムな値を 1 つ返します。

```typescript
import { pipe, sample } from 'es-toolkit/fp';

const value = pipe([1, 2, 3], sample());
// value is one of 1, 2, or 3.
```

#### パラメータ

この関数は引数を受け取りません。`sample()` のように呼び出してください。

#### 戻り値

(`(array: readonly T[]) => T`): `readonly T[]` をランダムな値 1 つに変換する関数です。
