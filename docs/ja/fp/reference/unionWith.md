# unionWith (関数型プログラミング)

カスタム等価関数を使って配列を結合する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, unionWith(secondArray, areItemsEqual));
```

## 使用法

`unionWith` は結合された配列を順に見て、`areItemsEqual` によって既に残した値と一致しない最初の値を残します。

```typescript
import { unionWith, pipe } from 'es-toolkit/fp';

pipe([{ id: 1 }, { id: 2 }], unionWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)); // => [{ id: 1 }, { id: 2 }, { id: 3 }]
```

#### パラメータ

- `secondArray` (`readonly T[]`): パイプされた配列の後に結合する配列です。
- `areItemsEqual` (`(item: T, other: T) => boolean`): 2 つの値が等しいかどうかを判定する関数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` をカスタム等価基準の和集合に変換する関数です。
