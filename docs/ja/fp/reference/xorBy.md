# xorBy (関数型プログラミング)

マッピングされたキーを基準に対称差を返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, xorBy(secondArray, mapper));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`xorBy`](../../reference/array/xorBy.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`xorBy` は `mapper` が返す値を比較し、マッピングされたキーが片方の配列にだけ存在する値を返します。

```typescript
import { pipe, xorBy } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  xorBy([{ id: 2 }, { id: 3 }], item => item.id)
); // => [{ id: 1 }, { id: 3 }]
```

#### パラメータ

- `secondArray` (`readonly T[]`): パイプされた配列と比較する配列です。
- `mapper` (`(item: T) => U`): 比較キーを返す関数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` をキー基準の対称差に変換する関数です。
