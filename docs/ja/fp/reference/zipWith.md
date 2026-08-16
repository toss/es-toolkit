# zipWith (関数型プログラミング)

複数の配列の値をインデックスごとに結合する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, zipWith(...arrs, combine));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`zipWith`](../../reference/array/zipWith.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`zipWith` は、パイプされた配列と設定した配列の同じインデックスの値を `combine` に渡します。配列の長さが異なる場合、足りない値は `undefined` として渡されます。

```typescript
import { pipe, zipWith } from 'es-toolkit/fp';

pipe(
  [1, 2],
  zipWith([10, 20], (a, b) => a + b)
); // => [11, 22]

pipe(
  [1, 2, 3],
  zipWith([10], (a, b = 0) => a + b)
); // => [11, 2, 3]
```

#### パラメータ

- `arrs` (`Array<readonly unknown[]>`): パイプされた配列と一緒に結合する配列です。
- `combine` (`(...values: unknown[]) => R`): 同じインデックスの値と最後にインデックスを受け取り、新しい値を返す関数です。

#### 戻り値

(`(array: readonly T[]) => R[]`): パイプされた配列を結合された値の配列に変換する関数です。
