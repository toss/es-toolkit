# groupBy (関数型プログラミング)

値をキーごとにグループ化する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, groupBy(getKey));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`groupBy`](../../reference/array/groupBy.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`groupBy` はパイプされた配列の各値に `getKey` を呼び出し、返されたキーをキー、一致する項目の配列を値にしたオブジェクトを返します。

```typescript
import { groupBy, pipe } from 'es-toolkit/fp';

pipe(
  ['one', 'two', 'three'],
  groupBy(word => word.length)
); // => { 3: ['one', 'two'], 5: ['three'] }
```

#### パラメータ

- `getKey` (`(item: T) => K`): 各値のグループキーを返す関数です。

#### 戻り値

(`(array: readonly T[]) => Record<K, T[]>`): `readonly T[]` をキーごとにグループ化された配列のオブジェクトに変換する関数です。
