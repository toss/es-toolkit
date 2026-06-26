# dropRightWhile (関数型プログラミング)

述語が通る間、末尾の値を取り除く関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, dropRightWhile(predicate));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`dropRightWhile`](../../reference/array/dropRightWhile.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`dropRightWhile` はパイプされた配列を末尾から見て、`predicate` が `true` を返す間だけ値を取り除きます。条件を満たさない最初の値で止まります。

```typescript
import { dropRightWhile, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  dropRightWhile(value => value > 2)
); // => [1, 2]
```

#### パラメータ

- `predicate` (`(item: T) => boolean`): 末尾の値を取り除くかどうかを判定する関数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を末尾から値を取り除いた後の配列に変換する関数です。
