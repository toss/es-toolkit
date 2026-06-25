# head (関数型プログラミング)

配列の最初の値を返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, head());
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`head`](../../reference/array/head.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`head` はパイプされた配列の最初の値を返します。配列が空の場合は `undefined` を返します。

```typescript
import { head, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], head()); // => 1

pipe([], head()); // => undefined
```

#### パラメータ

この関数は引数を受け取りません。`head()` のように呼び出してください。

#### 戻り値

(`(array: readonly T[]) => T | undefined`): `readonly T[]` を最初の値に変換する関数です。
