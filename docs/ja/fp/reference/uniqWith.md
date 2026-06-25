# uniqWith (関数型プログラミング)

カスタム等価関数を使って重複を取り除く関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, uniqWith(areItemsEqual));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`uniqWith`](../../reference/array/uniqWith.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`uniqWith` は、`areItemsEqual` によって既に残した値と一致しない最初の値を残します。[`pipe`](./pipe.md) の中では遅延評価に対応しています。

```typescript
import { pipe, uniqWith } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 1 }, { id: 2 }],
  uniqWith((a, b) => a.id === b.id)
); // => [{ id: 1 }, { id: 2 }]
```

#### パラメータ

- `areItemsEqual` (`(item: T, other: T) => boolean`): 2 つの値が等しいかどうかを判定する関数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` をカスタム等価基準で重複を取り除いた配列に変換する関数です。
