# combinations (関数型プログラミング)

指定したサイズの組み合わせを返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, combinations(size));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`combinations`](../../reference/array/combinations.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`combinations` は、パイプされた配列から `size` 個の値を選ぶすべての方法を返します。各組み合わせ内では元の順序が保たれます。

```typescript
import { combinations, pipe } from 'es-toolkit/fp';

pipe(['a', 'b', 'c'], combinations(2)); // => [['a', 'b'], ['a', 'c'], ['b', 'c']]
```

#### パラメータ

- `size` (`number`): 各組み合わせに含める値の数です。

#### 戻り値

(`(array: readonly T[]) => T[][]`): `readonly T[]` を組み合わせの配列に変換する関数です。

#### エラー

`size` が 0 以上の整数でない場合、エラーを投げます。
