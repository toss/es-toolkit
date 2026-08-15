# xorWith (関数型プログラミング)

カスタム等価関数を使って対称差を返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, xorWith(secondArray, areItemsEqual));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`xorWith`](../../reference/array/xorWith.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`xorWith` は、`areItemsEqual` によって 2 つの配列の間で一致しない値を返します。

```typescript
import { pipe, xorWith } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  xorWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)
); // => [{ id: 1 }, { id: 3 }]
```

#### パラメータ

- `secondArray` (`readonly T[]`): パイプされた配列と比較する配列です。
- `areItemsEqual` (`(item: T, other: T) => boolean`): 2 つの値が等しいかどうかを判定する関数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` をカスタム等価基準の対称差に変換する関数です。
