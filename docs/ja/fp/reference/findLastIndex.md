# findLastIndex (関数型プログラミング)

条件を満たす最後の値のインデックスを返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, findLastIndex(predicate));
```

::: info

このヘルパーは `es-toolkit/fp` 専用です。この操作を [`pipe`](./pipe.md) パイプラインの 1 ステップとして組み合わせたいときに使用してください。

:::

## 使用法

`findLastIndex` はパイプされた配列を末尾から検索し、`predicate` が `true` を返す最初の値のインデックスを返します。一致する値がなければ `-1` を返します。

```typescript
import { findLastIndex, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  findLastIndex(value => value % 2 === 0)
); // => 3
```

#### パラメータ

- `predicate` (`(value: T, index: number) => boolean`): 各値をテストする関数です。

#### 戻り値

(`(array: readonly T[]) => number`): `readonly T[]` を最後に一致したインデックス、または `-1` に変換する関数です。
