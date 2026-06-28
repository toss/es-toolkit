# differenceWith (関数型プログラミング)

カスタム等価関数を使って値を除外する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, differenceWith(secondArray, areItemsEqual));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`differenceWith`](../../reference/array/differenceWith.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`differenceWith` は、`secondArray` のすべての値に対して `areItemsEqual` が `false` を返す場合だけ、パイプされた配列の値を残します。

```typescript
import { differenceWith, pipe } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  differenceWith([{ id: 2 }], (a, b) => a.id === b.id)
); // => [{ id: 1 }]
```

#### パラメータ

- `secondArray` (`readonly U[]`): 比較対象の値を含む配列です。
- `areItemsEqual` (`(item: T, other: U) => boolean`): 2 つの値が等しいかどうかを判定する関数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を比較関数に一致しない値の配列に変換する関数です。
