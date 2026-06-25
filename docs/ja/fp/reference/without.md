# without (関数型プログラミング)

配列から特定の値を取り除く関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, without(...values));
```

## 使用法

`without` はパイプされた配列から、`values` のいずれかと等しいすべての値を取り除きます。[`pipe`](./pipe.md) の中では遅延評価に対応しています。

```typescript
import { without, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 2], without(2)); // => [1, 3]
```

#### パラメータ

- `values` (`T[]`): パイプされた配列から取り除く値です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を `values` を含まない配列に変換する関数です。
