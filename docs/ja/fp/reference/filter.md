# filter (関数型プログラミング)

テストを通過した要素だけを残す関数を作成します。`Array.prototype.filter` と同等です。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, filter(predicate));
```

::: info

このヘルパーは `es-toolkit/fp` 専用です。この操作を [`pipe`](./pipe.md) パイプラインの 1 ステップとして組み合わせたいときに使用してください。

:::

## 使用法

`filter` は `predicate` が真と評価される値を返した要素だけを残します。型述語を使うと結果の要素の型が絞り込まれます。これは **遅延評価に対応** しています。[`pipe`](./pipe.md) の中では隣接する遅延処理と融合されます。

```typescript
import { filter, pipe } from 'es-toolkit/fp';

// 偶数だけを残します。
pipe(
  [1, 2, 3, 4],
  filter(x => x % 2 === 0)
); // => [2, 4]

// インデックスは第 2 引数として利用できます。
pipe(
  [10, 20, 30, 40],
  filter((_value, index) => index % 2 === 0)
); // => [10, 30]
```

型ガードを使うと結果の型が絞り込まれます。

```typescript
import { filter, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 'a', 2, 'b'],
  filter((x): x is string => typeof x === 'string')
);
// result は string[] 型になり、['a', 'b'] と等しくなります
```

#### パラメータ

- `predicate` (`(value: T, index: number) => boolean`): 各要素に対して呼び出される関数です。要素を残すには `true` を返します。型ガード（`value is S`）を使うと結果の型が絞り込まれます。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` をフィルタリングされた配列に変換する関数です。型ガードを使った場合、結果は `S[]` になります。
