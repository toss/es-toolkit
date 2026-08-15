# intersection (関数型プログラミング)

別の配列にも含まれる値を残す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, intersection(secondArray));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`intersection`](../../reference/array/intersection.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`intersection` は、パイプされた配列のうち `secondArray` にも含まれる値だけを残します。パイプされた配列の順序は保たれます。

```typescript
import { intersection, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], intersection([2, 3, 4])); // => [2, 3]
```

#### パラメータ

- `secondArray` (`readonly T[]`): 残す値を含む配列です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を `secondArray` にも含まれる値の配列に変換する関数です。
