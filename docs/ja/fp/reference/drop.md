# drop (関数型プログラミング)

配列の先頭から値を取り除く関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, drop(count));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`drop`](../../reference/array/drop.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`drop` はパイプされた配列の先頭から `count` 個の値を取り除きます。[`pipe`](./pipe.md) の中では遅延評価に対応しています。

```typescript
import { drop, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], drop(2)); // => [3, 4]
```

#### パラメータ

- `count` (`number`): 先頭から取り除く値の数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を残りの値の配列に変換する関数です。
