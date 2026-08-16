# flattenDeep (関数型プログラミング)

ネストした配列を再帰的に平坦化する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, flattenDeep());
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`flattenDeep`](../../reference/array/flattenDeep.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`flattenDeep` はパイプされた配列のすべてのネストした配列レイヤーを再帰的に取り除きます。[`pipe`](./pipe.md) の中では遅延評価に対応しています。

```typescript
import { flattenDeep, pipe } from 'es-toolkit/fp';

pipe([1, [2, [3, [4]]]], flattenDeep()); // => [1, 2, 3, 4]
```

#### パラメータ

この関数は引数を受け取りません。`flattenDeep()` のように呼び出してください。

#### 戻り値

(`(array: readonly T[]) => Array<ExtractNestedArrayType<T>>`): ネストした配列を深く平坦化した配列に変換する関数です。
