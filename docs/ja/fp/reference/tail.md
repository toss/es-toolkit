# tail (関数型プログラミング)

最初の値を除くすべての値を返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, tail());
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`tail`](../../reference/array/tail.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`tail` はパイプされた配列から最初の値を除いた新しい配列を返します。

```typescript
import { pipe, tail } from 'es-toolkit/fp';

pipe([1, 2, 3], tail()); // => [2, 3]
```

#### パラメータ

この関数は引数を受け取りません。`tail()` のように呼び出してください。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を最初の値を除いた配列に変換する関数です。
