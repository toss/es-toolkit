# shuffle (関数型プログラミング)

配列をシャッフルしたコピーを返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, shuffle());
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`shuffle`](../../reference/array/shuffle.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`shuffle` はパイプされた配列と同じ値をランダムな順序で含む新しい配列を返します。入力配列は変更しません。

```typescript
import { pipe, shuffle } from 'es-toolkit/fp';

const values = pipe([1, 2, 3], shuffle());
// values contains 1, 2, and 3 in random order.
```

#### パラメータ

この関数は引数を受け取りません。`shuffle()` のように呼び出してください。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` をシャッフルしたコピーに変換する関数です。
