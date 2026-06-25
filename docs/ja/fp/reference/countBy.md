# countBy (関数型プログラミング)

キーごとに値の数を数える関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, countBy(mapper));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`countBy`](../../reference/array/countBy.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`countBy` はパイプされた配列の各値に `mapper` を呼び出し、mapper の結果をキー、個数を値にしたオブジェクトを返します。

```typescript
import { countBy, pipe } from 'es-toolkit/fp';

pipe(
  ['one', 'two', 'three'],
  countBy(word => word.length)
); // => { 3: 2, 5: 1 }
```

#### パラメータ

- `mapper` (`(item: T) => K`): 数えるために使うキーを返す関数です。

#### 戻り値

(`(array: readonly T[]) => Record<K, number>`): `readonly T[]` をキーごとの個数オブジェクトに変換する関数です。
