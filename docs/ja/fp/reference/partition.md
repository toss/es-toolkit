# partition (関数型プログラミング)

値を条件に合うグループと合わないグループに分ける関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, partition(predicate));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`partition`](../../reference/array/partition.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`partition` は 2 つの配列の組を返します。最初の配列には `predicate` が `true` を返した値が入り、2 番目の配列には残りの値が入ります。

```typescript
import { partition, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  partition(value => value % 2 === 0)
); // => [[2, 4], [1, 3]]
```

#### パラメータ

- `predicate` (`(value: T) => boolean`): 各値がどちらのグループに入るかを判定する関数です。

#### 戻り値

(`(array: readonly T[]) => [truthy: T[], falsy: T[]]`): `readonly T[]` を条件に合う配列と合わない配列に変換する関数です。
