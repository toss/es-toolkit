# compact (関数型プログラミング)

配列から falsy な値を取り除く関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, compact());
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`compact`](../../reference/array/compact.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`compact` は `false`、`null`、`undefined`、`0`、`-0`、`0n`、空文字列、`NaN` を取り除きます。[`pipe`](./pipe.md) の中では遅延評価に対応しているため、末尾の `take` によって走査を早期に止められます。

```typescript
import { compact, pipe } from 'es-toolkit/fp';

pipe([0, 1, false, 2, '', 3], compact()); // => [1, 2, 3]
```

#### パラメータ

この関数は引数を受け取りません。`compact()` のように呼び出してください。

#### 戻り値

(`(array: readonly T[]) => Array<NotFalsey<T>>`): `readonly T[]` を falsy な値を含まない配列に変換する関数です。
