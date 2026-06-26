# intersectionBy (関数型プログラミング)

マッピングされたキーを基準に値を残す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, intersectionBy(secondArray, mapper));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`intersectionBy`](../../reference/array/intersectionBy.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`intersectionBy` は `mapper` が返す値を比較します。パイプされた配列の値は、マッピングされたキーが `secondArray` に存在する場合だけ残ります。

```typescript
import { intersectionBy, pipe } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  intersectionBy([2], value => (typeof value === 'number' ? value : value.id))
); // => [{ id: 2 }]
```

#### パラメータ

- `secondArray` (`readonly U[]`): マッピングされたキーを保持基準として使う値の配列です。
- `mapper` (`(item: T | U) => unknown`): 比較キーを返す関数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を `secondArray` にキーが存在する値の配列に変換する関数です。
