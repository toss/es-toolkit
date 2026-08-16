# findLast (関数型プログラミング)

条件を満たす最後の値を返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, findLast(predicate));
```

::: info

このヘルパーは `es-toolkit/fp` 専用です。この操作を [`pipe`](./pipe.md) パイプラインの 1 ステップとして組み合わせたいときに使用してください。

:::

## 使用法

`findLast` はパイプされた配列を末尾から検索し、`predicate` が `true` を返す最初の値を返します。一致する値がなければ `undefined` を返します。

```typescript
import { findLast, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  findLast(value => value % 2 === 0)
); // => 4
```

#### パラメータ

- `predicate` (`(value: T, index: number) => boolean`): 各値をテストする関数です。

#### 戻り値

(`(array: readonly T[]) => T | undefined`): `readonly T[]` を最後に一致した値、または `undefined` に変換する関数です。
