# takeRightWhile (関数型プログラミング)

述語が通る間、末尾の値を取り出す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, takeRightWhile(predicate));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`takeRightWhile`](../../reference/array/takeRightWhile.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`takeRightWhile` はパイプされた配列を末尾から見て、`predicate` が `true` を返す間だけ値を残します。条件を満たさない最初の値で止まります。

```typescript
import { pipe, takeRightWhile } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  takeRightWhile(value => value > 2)
); // => [3, 4]
```

#### パラメータ

- `predicate` (`(item: T) => boolean`): 末尾の値を残すかどうかを判定する関数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を条件を満たす末尾の値の配列に変換する関数です。
