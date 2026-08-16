# keyBy (関数型プログラミング)

各値を基準にキー付けされたオブジェクトを作成する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, keyBy(getKey));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`keyBy`](../../reference/array/keyBy.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`keyBy` はパイプされた配列の各値に `getKey` を呼び出し、返されたキーをキー、元の項目を値にしたオブジェクトを返します。同じキーがある場合、後の値が前の値を上書きします。

```typescript
import { keyBy, pipe } from 'es-toolkit/fp';

pipe(
  [
    { id: 'a', value: 1 },
    { id: 'b', value: 2 },
  ],
  keyBy(item => item.id)
); // => { a: { id: 'a', value: 1 }, b: { id: 'b', value: 2 } }
```

#### パラメータ

- `getKey` (`(item: T) => K`): 各値のキーを返す関数です。

#### 戻り値

(`(array: readonly T[]) => Record<K, T>`): `readonly T[]` を `getKey` によってキー付けされたオブジェクトに変換する関数です。
