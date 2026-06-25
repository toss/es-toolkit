# cartesianProduct (関数型プログラミング)

パイプされた配列と他の配列の直積を求める関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, cartesianProduct(...arrs));
```

## 使用法

`cartesianProduct` は、パイプされた配列と設定した各配列から 1 つずつ値を選んで作れるすべてのタプルを返します。右端の配列が最も速く進みます。

```typescript
import { cartesianProduct, pipe } from 'es-toolkit/fp';

pipe([1, 2], cartesianProduct(['a', 'b'])); // => [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

pipe([], cartesianProduct(['a', 'b'])); // => []
```

#### パラメータ

- `arrs` (`Array<readonly T[]>`): パイプされた配列の後に含める配列です。

#### 戻り値

(`(array: readonly T[]) => T[][]`): パイプされた配列を直積のタプル配列に変換する関数です。
