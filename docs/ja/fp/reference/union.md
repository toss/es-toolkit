# union (関数型プログラミング)

2 つの配列を重複値なしで結合する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, union(secondArray));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`union`](../../reference/array/union.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`union` は、まずパイプされた配列の一意な値を返し、続いて `secondArray` のうちまだ現れていない値を返します。

```typescript
import { pipe, union } from 'es-toolkit/fp';

pipe([1, 2, 2], union([2, 3])); // => [1, 2, 3]
```

#### パラメータ

- `secondArray` (`readonly T[]`): パイプされた配列の後に結合する配列です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を 2 つの配列の和集合に変換する関数です。
