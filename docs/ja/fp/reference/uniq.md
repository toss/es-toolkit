# uniq (関数型プログラミング)

配列から重複した値を取り除く関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, uniq());
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`uniq`](../../reference/array/uniq.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`uniq` は一意な値だけを含む新しい配列を返し、最初に現れる順序を保持します。等価性は `SameValueZero`（`Set` のセマンティクス）に従います。

```typescript
import { pipe, uniq } from 'es-toolkit/fp';

pipe([1, 2, 2, 3, 3, 3], uniq()); // => [1, 2, 3]

// 最初に現れる順序が保持されます。
pipe([3, 1, 2, 1, 3], uniq()); // => [3, 1, 2]
```

#### パラメータ

この関数は引数を取りません。`uniq()` として呼び出してください。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を重複のない新しい `T[]` に変換する関数です。
