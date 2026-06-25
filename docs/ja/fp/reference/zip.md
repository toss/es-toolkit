# zip (関数型プログラミング)

複数の配列の値をインデックスごとにまとめる関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, zip(...arrs));
```

::: info

パイプラインとして組み合わせない通常のコードでは、元の es-toolkit の [`zip`](../../reference/array/zip.md) を使うのがおすすめです。[`pipe`](./pipe.md) で変換をつなげるときは、この `fp` 版を使用してください。

:::

## 使用法

`zip` は、パイプされた配列と設定した配列の同じインデックスの値をまとめます。配列の長さが異なる場合、足りない値は `undefined` になります。

```typescript
import { pipe, zip } from 'es-toolkit/fp';

pipe([1, 2], zip(['a', 'b'])); // => [[1, 'a'], [2, 'b']]

pipe([1, 2, 3], zip(['a'])); // => [[1, 'a'], [2, undefined], [3, undefined]]
```

#### パラメータ

- `arrs` (`Array<readonly T[]>`): パイプされた配列と一緒に zip する配列です。

#### 戻り値

(`(array: readonly T[]) => T[][]`): パイプされた配列をインデックスごとの行に変換する関数です。
