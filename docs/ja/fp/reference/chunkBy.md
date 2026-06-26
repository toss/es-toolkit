# chunkBy (関数型プログラミング)

キーが変わるたびに隣り合う値を分割する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, chunkBy(iteratee));
```

::: info

このヘルパーは `es-toolkit/fp` 専用です。この操作を [`pipe`](./pipe.md) パイプラインの 1 ステップとして組み合わせたいときに使用してください。

:::

## 使用法

`chunkBy` はパイプされた配列を左から右へ走査し、`iteratee` が同じキーを返す隣接値をまとめます。キーが変わると新しいチャンクが始まります。

```typescript
import { chunkBy, pipe } from 'es-toolkit/fp';

pipe(
  [1, 1, 2, 2, 1],
  chunkBy(value => value)
); // => [[1, 1], [2, 2], [1]]
```

#### パラメータ

- `iteratee` (`(value: T) => unknown`): 各値のグループキーを返す関数です。

#### 戻り値

(`(array: readonly T[]) => T[][]`): `readonly T[]` を隣接値のチャンク配列に変換する関数です。
