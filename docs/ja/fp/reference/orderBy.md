# orderBy (関数型プログラミング)

条件と並び順に従ってオブジェクトをソートする関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, orderBy(criteria, orders));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`orderBy`](../../reference/array/orderBy.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`orderBy` はパイプされた配列を各条件の順にソートします。各並び順は、対応する条件を昇順または降順のどちらでソートするかを制御します。

```typescript
import { orderBy, pipe } from 'es-toolkit/fp';

const users = [
  { name: 'a', age: 2 },
  { name: 'b', age: 1 },
];

pipe(users, orderBy(['age'], ['asc'])); // => [{ name: 'b', age: 1 }, { name: 'a', age: 2 }]
```

#### パラメータ

- `criteria` (`Array<((item: T) => unknown) | keyof T>`): 比較に使うオブジェクトキーやセレクター関数です。
- `orders` (`Array<'asc' | 'desc'>`): 各条件の並び順です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を新しくソートされた配列に変換する関数です。
