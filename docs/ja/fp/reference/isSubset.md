# isSubset (関数型プログラミング)

パイプされた配列が別の配列の部分集合かどうかを確認する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, isSubset(superset));
```

## 使用法

`isSubset` は、パイプされた配列のすべての値が `superset` に含まれる場合に `true` を返します。

```typescript
import { isSubset, pipe } from 'es-toolkit/fp';

pipe([1, 2], isSubset([1, 2, 3])); // => true

pipe([1, 4], isSubset([1, 2, 3])); // => false
```

#### パラメータ

- `superset` (`readonly T[]`): パイプされた配列のすべての値を含む可能性がある配列です。

#### 戻り値

(`(array: readonly T[]) => boolean`): `readonly T[]` を部分集合かどうかに変換する関数です。
