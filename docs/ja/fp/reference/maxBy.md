# maxBy (関数型プログラミング)

計算されたスコアが最大の値を返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, maxBy(getValue));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`maxBy`](../../reference/array/maxBy.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`maxBy` はパイプされた配列の各値に `getValue` を呼び出し、その結果が最大の値を返します。配列が空の場合は `undefined` を返します。

```typescript
import { maxBy, pipe } from 'es-toolkit/fp';

pipe(
  [{ score: 10 }, { score: 30 }, { score: 20 }],
  maxBy(item => item.score)
); // => { score: 30 }
```

#### パラメータ

- `getValue` (`(item: T) => number`): 比較に使う値を返す関数です。

#### 戻り値

(`(array: readonly T[]) => T | undefined`): `readonly T[]` を最大の項目、または `undefined` に変換する関数です。
