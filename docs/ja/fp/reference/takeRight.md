# takeRight (関数型プログラミング)

配列の末尾から値を取り出す関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, takeRight(count));
```

## 使用法

`takeRight` はパイプされた配列の末尾から `count` 個の値を返します。

```typescript
import { takeRight, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], takeRight(2)); // => [3, 4]
```

#### パラメータ

- `count` (`number`): 末尾から取り出す値の数です。

#### 戻り値

(`(array: readonly T[]) => T[]`): `readonly T[]` を末尾の `count` 個の値に変換する関数です。
