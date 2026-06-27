# flatMapDeep (関数型プログラミング)

各値を変換し、結果を深く平坦化する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, flatMapDeep(iteratee));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`flatMapDeep`](../../reference/array/flatMapDeep.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`flatMapDeep` はパイプされた配列の各値に `iteratee` を呼び出し、返された配列を再帰的に平坦化します。

```typescript
import { flatMapDeep, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2],
  flatMapDeep(value => [[value, value]])
); // => [1, 1, 2, 2]
```

#### パラメータ

- `iteratee` (`(item: T, index: number) => U`): 深く平坦化する前に各値を変換する関数です。

#### 戻り値

(`(array: readonly T[]) => Array<ExtractNestedArrayType<U>>`): `readonly T[]` を深く平坦化した配列に変換する関数です。
