# unionBy (関数型プログラミング)

マッピングされたキーを基準に配列を重複なしで結合する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, unionBy(secondArray, mapper));
```

## 使用法

`unionBy` は `mapper` が返す値を比較します。パイプされた配列から各マッピングキーの最初の値を残し、続いて `secondArray` の値を処理します。

```typescript
import { unionBy, pipe } from 'es-toolkit/fp';

pipe([{ id: 1 }, { id: 2 }], unionBy([{ id: 2 }, { id: 3 }], item => item.id)); // => [{ id: 1 }, { id: 2 }, { id: 3 }]
```

#### パラメータ

- `secondArray` (`readonly T[]`): パイプされた配列の後に結合する配列です。
- `mapper` (`(item: T) => U`): 一意性の判定に使うキーを返す関数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` をマッピングキー基準の和集合に変換する関数です。
