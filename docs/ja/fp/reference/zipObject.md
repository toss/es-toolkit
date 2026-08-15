# zipObject (関数型プログラミング)

キーと値からオブジェクトを作成する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, zipObject(values));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`zipObject`](../../reference/array/zipObject.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`zipObject` はパイプされた配列をキーとして使い、各キーを `values` の同じインデックスの値と組み合わせます。

```typescript
import { pipe, zipObject } from 'es-toolkit/fp';

pipe(['a', 'b'] as const, zipObject([1, 2])); // => { a: 1, b: 2 }
```

#### パラメータ

- `values` (`readonly V[]`): パイプされた配列のキーにインデックスごとに割り当てる値です。

#### 戻り値

(`(keys: readonly P[]) => Record<P, V>`): キー配列を `values` から作られたオブジェクトに変換する関数です。
