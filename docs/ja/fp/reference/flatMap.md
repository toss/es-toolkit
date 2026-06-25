# flatMap (関数型プログラミング)

各値を配列に変換し、結果を 1 段階平坦化する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, flatMap(callback));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`flatMap`](../../reference/array/flatMap.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`flatMap` はパイプされた配列の各値に `callback` を呼び出し、返された配列を連結します。[`pipe`](./pipe.md) の中では遅延評価に対応しています。

```typescript
import { flatMap, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3],
  flatMap(value => [value, value * 10])
); // => [1, 10, 2, 20, 3, 30]
```

#### パラメータ

- `callback` (`(value: T, index: number) => U[]`): 各値を配列に変換する関数です。

#### 戻り値

(`(array: readonly T[]) => U[]`): `readonly T[]` を callback の結果を平坦化した配列に変換する関数です。
