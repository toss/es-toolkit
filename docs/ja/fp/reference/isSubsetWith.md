# isSubsetWith (関数型プログラミング)

カスタム等価関数を使って部分集合かどうかを確認する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, isSubsetWith(superset, areItemsEqual));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`isSubsetWith`](../../reference/array/isSubsetWith.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`isSubsetWith` は、パイプされた配列のすべての値が `areItemsEqual` によって `superset` の少なくとも 1 つの値と一致する場合に `true` を返します。

```typescript
import { isSubsetWith, pipe } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }],
  isSubsetWith([{ id: 1 }, { id: 2 }], (a, b) => a.id === b.id)
); // => true
```

#### パラメータ

- `superset` (`readonly T[]`): パイプされた配列のすべての値を含む可能性がある配列です。
- `areItemsEqual` (`(item: T, other: T) => boolean`): 2 つの値が等しいかどうかを判定する関数です。

#### 戻り値

(`(array: readonly T[]) => boolean`): `readonly T[]` を部分集合かどうかに変換する関数です。
