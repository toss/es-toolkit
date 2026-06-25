# reverse (関数型プログラミング)

配列を反転したコピーを返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, reverse());
```

::: info

このヘルパーは `es-toolkit/fp` 専用です。この操作を [`pipe`](./pipe.md) パイプラインの 1 ステップとして組み合わせたいときに使用してください。

:::

## 使用法

`reverse` はパイプされた配列の値を逆順にした新しい配列を返します。入力配列は変更しません。

```typescript
import { pipe, reverse } from 'es-toolkit/fp';

const array = [1, 2, 3];

pipe(array, reverse()); // => [3, 2, 1]
array; // => [1, 2, 3]
```

#### パラメータ

この関数は引数を受け取りません。`reverse()` のように呼び出してください。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を反転したコピーに変換する関数です。
