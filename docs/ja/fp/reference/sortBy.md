# sortBy (関数型プログラミング)

オブジェクトの配列を 1 つ以上の基準で昇順に並べ替える関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, sortBy(criteria));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`sortBy`](../../reference/array/sortBy.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`sortBy` はオブジェクトの配列を昇順に並べ替えます。各基準は、オブジェクトのキー、または比較する値を返す関数のいずれかです。2 つの要素がある基準で同じ値になった場合は、次の基準で順序が決まります。並べ替えは安定で、入力を変更しません。

```typescript
import { pipe, sortBy } from 'es-toolkit/fp';

const users = [
  { user: 'foo', age: 24 },
  { user: 'bar', age: 7 },
  { user: 'foo', age: 8 },
  { user: 'bar', age: 29 },
];

// 単一のキーで並べ替えます。
pipe(users, sortBy(['age']));
// => [{ user: 'bar', age: 7 }, { user: 'foo', age: 8 }, { user: 'foo', age: 24 }, { user: 'bar', age: 29 }]

// 複数の基準で並べ替え、同じ値のときは次の基準で順序を決めます。
pipe(users, sortBy(['user', 'age']));
// => [{ user: 'bar', age: 7 }, { user: 'bar', age: 29 }, { user: 'foo', age: 8 }, { user: 'foo', age: 24 }]

// キーの代わりにセレクター関数を使えます。
pipe(users, sortBy([item => item.age]));
```

#### パラメータ

- `criteria` (`Array<((item: T) => unknown) | keyof T>`): 比較に使うオブジェクトのキーやセレクター関数です。指定した順に適用されます。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を並べ替えられた新しい `T[]` に変換する関数です。
