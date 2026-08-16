# toFilled (関数型プログラミング)

配列の一部を埋めたコピーを返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, toFilled(value, start, end));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`toFilled`](../../reference/array/toFilled.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`toFilled` は、パイプされた配列のコピーを `start` から `end` の直前まで `value` で埋めます。`Array.prototype.fill` のインデックス規則に従い、入力配列は変更しません。

```typescript
import { pipe, toFilled } from 'es-toolkit/fp';

const array = [1, 2, 3, 4];

pipe(array, toFilled(0, 1, 3)); // => [1, 0, 0, 4]
array; // => [1, 2, 3, 4]
```

#### パラメータ

- `value` (`U`): 返される配列に書き込む値です。
- `start` (`number, optional`): 開始インデックスです。デフォルトは `0` です。
- `end` (`number, optional`): 終了インデックスです。デフォルトは配列の長さです。

#### 戻り値

(`(array: readonly T[]) => Array<T | U>`): `readonly T[]` を一部が埋められたコピーに変換する関数です。
