# takeWhile (関数型プログラミング)

述語が通る間、先頭の値を取り出す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, takeWhile(predicate));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`takeWhile`](../../reference/array/takeWhile.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`takeWhile` はパイプされた配列を先頭から見て、`predicate` が `true` を返す間だけ値を残します。遅延評価に対応しており、[`pipe`](./pipe.md) の中で前の遅延処理を早期に止められます。

```typescript
import { pipe, takeWhile } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 1],
  takeWhile(value => value < 3)
); // => [1, 2]
```

#### パラメータ

- `predicate` (`(element: T, index: number) => boolean`): 先頭の値を残すかどうかを判定する関数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を条件を満たす先頭の値の配列に変換する関数です。
