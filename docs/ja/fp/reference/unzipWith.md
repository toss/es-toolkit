# unzipWith (関数型プログラミング)

zip された配列を位置ごとに再グループ化し、各位置を結合する関数を作成します。関数型プログラミングの [`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, unzipWith(iteratee));
```

## 使用法

`unzipWith` はグループ化された行から同じ位置の値を集め、`iteratee` に渡して、その結果を返します。

```typescript
import { unzipWith, pipe } from 'es-toolkit/fp';

pipe([[1, 10], [2, 20]], unzipWith((a, b) => a + b)); // => [3, 30]
```

#### パラメータ

- `iteratee` (`(...args: T[]) => R`): 同じ位置の値を結合する関数です。

#### 戻り値

(`(target: readonly T[][]) => R[]`): zip された行を位置ごとの結合結果に変換する関数です。
