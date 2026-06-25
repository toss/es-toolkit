# difference (関数型プログラミング)

別の配列に含まれる値を除外する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, difference(secondArray));
```

## 使用法

`difference` は、パイプされた配列のうち `secondArray` に含まれない値だけを残します。パイプされた配列の順序は保たれます。

```typescript
import { difference, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], difference([2, 4])); // => [1, 3]
```

#### パラメータ

- `secondArray` (`readonly T[]`): 除外する値を含む配列です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を `secondArray` に含まれない値の配列に変換する関数です。
