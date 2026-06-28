# length (関数型プログラミング)

配列の長さを返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, length());
```

::: info

このヘルパーは `es-toolkit/fp` 専用です。この操作を [`pipe`](./pipe.md) パイプラインの 1 ステップとして組み合わせたいときに使用してください。

:::

## 使用法

`length` はパイプされた配列に含まれる値の数を返します。

```typescript
import { length, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], length()); // => 3
```

#### パラメータ

この関数は引数を受け取りません。`length()` のように呼び出してください。

#### 戻り値

(`(array: readonly T[]) => number`): `readonly T[]` をその長さに変換する関数です。
