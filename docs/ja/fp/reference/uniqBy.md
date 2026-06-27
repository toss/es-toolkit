# uniqBy (関数型プログラミング)

マッピングされたキーを基準に重複を取り除く関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, uniqBy(mapper));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`uniqBy`](../../reference/array/uniqBy.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`uniqBy` は `mapper` が返す各キーの最初の値を残します。最初に現れた順序を保ち、[`pipe`](./pipe.md) の中では遅延評価に対応しています。

```typescript
import { pipe, uniqBy } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 1 }, { id: 2 }],
  uniqBy(item => item.id)
); // => [{ id: 1 }, { id: 2 }]
```

#### パラメータ

- `mapper` (`(item: T, index: number) => U`): 一意性の判定に使うキーを返す関数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` をキー基準で重複を取り除いた配列に変換する関数です。
