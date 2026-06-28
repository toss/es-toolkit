# intersectionWith (関数型プログラミング)

カスタム等価関数を使って値を残す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, intersectionWith(secondArray, areItemsEqual));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`intersectionWith`](../../reference/array/intersectionWith.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`intersectionWith` は、`secondArray` の少なくとも 1 つの値に対して `areItemsEqual` が `true` を返す場合、パイプされた配列の値を残します。

```typescript
import { intersectionWith, pipe } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  intersectionWith([{ id: 2 }], (a, b) => a.id === b.id)
); // => [{ id: 2 }]
```

#### パラメータ

- `secondArray` (`readonly U[]`): 比較対象の値を含む配列です。
- `areItemsEqual` (`(item: T, other: U) => boolean`): 2 つの値が等しいかどうかを判定する関数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を比較関数に一致する値の配列に変換する関数です。
