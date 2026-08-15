# join (関数型プログラミング)

配列の値を文字列に結合する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, join(separator));
```

::: info

このヘルパーは `es-toolkit/fp` 専用です。この操作を [`pipe`](./pipe.md) パイプラインの 1 ステップとして組み合わせたいときに使用してください。

:::

## 使用法

`join` は、パイプされた配列の値を `separator` で結合して文字列に変換します。`separator` を省略するとカンマを使います。

```typescript
import { join, pipe } from 'es-toolkit/fp';

pipe(['a', 'b', 'c'], join('-')); // => 'a-b-c'

pipe(['a', 'b', 'c'], join()); // => 'a,b,c'
```

#### パラメータ

- `separator` (`string, optional`): 値の間に挿入する文字列です。デフォルトは `,` です。

#### 戻り値

(`(array: readonly T[]) => string`): `readonly T[]` を結合された文字列に変換する関数です。
