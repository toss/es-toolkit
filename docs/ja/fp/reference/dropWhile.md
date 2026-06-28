# dropWhile (関数型プログラミング)

述語が通る間、先頭の値を取り除く関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, dropWhile(predicate));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`dropWhile`](../../reference/array/dropWhile.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`dropWhile` はパイプされた配列を先頭から見て、`predicate` が `true` を返す間だけ値を取り除きます。[`pipe`](./pipe.md) の中では遅延評価に対応しています。

```typescript
import { dropWhile, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 1],
  dropWhile(value => value < 3)
); // => [3, 1]
```

#### パラメータ

- `predicate` (`(item: T, index: number) => boolean`): 先頭の値を取り除くかどうかを判定する関数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を先頭から値を取り除いた後の配列に変換する関数です。
