# sampleSize (関数型プログラミング)

配列からランダムな値を複数返す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, sampleSize(size));
```

## 使用法

`sampleSize` はパイプされた配列から `size` 個のランダムな値を返します。同じ配列位置は繰り返しません。

```typescript
import { sampleSize, pipe } from 'es-toolkit/fp';

const values = pipe([1, 2, 3, 4], sampleSize(2));
// values has length 2 and contains values from the input array.
```

#### パラメータ

- `size` (`number`): 返すランダムな値の数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` をランダムな値の配列に変換する関数です。

#### エラー

`size` がパイプされた配列の長さより大きい場合、エラーを投げます。
