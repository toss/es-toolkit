# xor (関数型プログラミング)

2 つの配列のうち片方にだけ現れる値を返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, xor(secondArray));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`xor`](../../reference/array/xor.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`xor` は、パイプされた配列と `secondArray` の対称差を重複なしで返します。

```typescript
import { pipe, xor } from 'es-toolkit/fp';

pipe([1, 2, 3], xor([2, 3, 4])); // => [1, 4]
```

#### パラメータ

- `secondArray` (`readonly T[]`): パイプされた配列と比較する配列です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を対称差に変換する関数です。
