# dropRight (関数型プログラミング)

配列の末尾から値を取り除く関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, dropRight(count));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`dropRight`](../../reference/array/dropRight.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`dropRight` はパイプされた配列の末尾から `count` 個の値を取り除きます。

```typescript
import { dropRight, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], dropRight(2)); // => [1, 2]
```

#### パラメータ

- `count` (`number`): 末尾から取り除く値の数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を残りの値の配列に変換する関数です。
